import { Request, Response } from 'express'
import Cart, { ICartItem } from '../models/Cart'
import Product from '../models/Product'

// Extend Request to access the user attached by protect middleware
interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}

// Helper - recalculates the cart's total price based on current items
const calculateTotalPrice = async (items: ICartItem[]): Promise<number> => {
  let total = 0

  for (const item of items) {
    const product = await Product.findById(item.productId)
    if (product) {
      total += product.price * item.quantity
    }
  }

  return total
}

// GET CART - returns the logged-in user's cart with product details
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user?.id }).populate('items.productId')

    // If no cart exists yet, return an empty one
    if (!cart) {
      return res.status(200).json({ message: 'Cart is empty', cart: null })
    }

    res.status(200).json({
      message: 'Cart fetched successfully',
      cart
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// ADD TO CART - adds a product to the cart or increases quantity if already there
export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user?.id

    // Make sure the product actually exists before adding it
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // First time adding to cart - create a fresh cart
      cart = new Cart({ userId, items: [{ productId, quantity }], totalPrice: 0 })
    } else {
      // Cart exists - check if this product is already in it
      const existingItem = cart.items.find(
        (item: ICartItem) => item.productId.toString() === productId
      )

      if (existingItem) {
        // Product already in cart, just increase the quantity
        existingItem.quantity += quantity
      } else {
        // New product, add it to the items array
        cart.items.push({ productId, quantity })
      }
    }

    // Recalculate total price after every change
    cart.totalPrice = await calculateTotalPrice(cart.items)

    await cart.save()

    res.status(200).json({
      message: 'Item added to cart',
      cart
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// UPDATE CART ITEM - changes the quantity of a specific item in the cart
export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user?.id

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    // Find the item inside the cart
    const item = cart.items.find(
      (item: ICartItem) => item.productId.toString() === productId
    )

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' })
    }

    // Update the quantity to the new value
    item.quantity = quantity

    // Recalculate total price after the update
    cart.totalPrice = await calculateTotalPrice(cart.items)

    await cart.save()

    res.status(200).json({
      message: 'Cart item updated',
      cart
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// REMOVE CART ITEM - removes a specific product from the cart entirely
export const removeCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params
    const userId = req.user?.id

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    // Filter out the item that should be removed
    cart.items = cart.items.filter(
      (item: ICartItem) => item.productId.toString() !== productId
    )

    // Recalculate total price after removing the item
    cart.totalPrice = await calculateTotalPrice(cart.items)

    await cart.save()

    res.status(200).json({
      message: 'Item removed from cart',
      cart
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
