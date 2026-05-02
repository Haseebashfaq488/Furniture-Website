import { Request, Response } from 'express'
import Order, { IOrderItem } from '../models/Order'
import Cart, { ICartItem } from '../models/Cart'
import Product from '../models/Product'

// Extend Request to access the user attached by protect middleware
interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}

// PLACE ORDER - creates a new order from the user's current cart, then clears the cart
export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { shippingAddress } = req.body
    const userId = req.user?.id

    // Get the user's cart with product details
    const cart = await Cart.findOne({ userId }).populate('items.productId')

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty, cannot place an order' })
    }

    // Build the products array for the order from cart items
    const products: IOrderItem[] = cart.items.map((item: ICartItem) => ({
      productId: item.productId,
      quantity: item.quantity
    }))

    // Create the order using the cart's total
    const order = await Order.create({
      userId,
      products,
      totalAmount: cart.totalPrice,
      shippingAddress
    })

    // Clear the cart after the order is placed
    cart.items = []
    cart.totalPrice = 0
    await cart.save()

    res.status(201).json({
      message: 'Order placed successfully',
      order
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// GET USER ORDERS - returns all orders placed by the logged-in user
export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user?.id })
      .populate('products.productId')
      .sort({ createdAt: -1 })  // newest orders first

    res.status(200).json({
      message: 'Orders fetched successfully',
      count: orders.length,
      orders
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// GET ORDER BY ID - returns a single order (user can only see their own)
export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.productId')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Regular users can only view their own orders
    if (req.user?.role !== 'admin' && order.userId.toString() !== req.user?.id) {
      return res.status(403).json({ message: 'Access denied, this is not your order' })
    }

    res.status(200).json({
      message: 'Order fetched successfully',
      order
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// GET ALL ORDERS - admin only, returns every order in the system
export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')       // show who placed the order
      .populate('products.productId')          // show product details
      .sort({ createdAt: -1 })                // newest orders first

    res.status(200).json({
      message: 'All orders fetched successfully',
      count: orders.length,
      orders
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// UPDATE ORDER STATUS - admin only, moves an order through its lifecycle
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }  // return updated doc and validate the status value
    )

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json({
      message: 'Order status updated',
      order
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
