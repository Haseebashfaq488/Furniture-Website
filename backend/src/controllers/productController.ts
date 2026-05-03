import { Request, Response } from 'express'
import Product from '../models/Product'

// Extend Request to access the user attached by protect middleware
interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}

// GET ALL PRODUCTS - returns all products, with optional category filter
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query

    // Build the filter object - if category is provided, use it; otherwise get everything
    const filter: any = category ? { category } : {}

    const products = await Product.find(filter)

    res.status(200).json({
      message: 'Products fetched successfully',
      count: products.length,
      products
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// GET PRODUCT BY ID - returns a single product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({
      message: 'Product fetched successfully',
      product
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// CREATE PRODUCT - admin only, adds a new product to the store
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, category, image, stock } = req.body

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      stock
    })

    res.status(201).json({
      message: 'Product created successfully',
      product
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// UPDATE PRODUCT - admin only, updates an existing product's details
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // return the updated doc and validate changes
    )

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// DELETE PRODUCT - admin only, removes a product from the store
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({ message: 'Product deleted successfully' })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
