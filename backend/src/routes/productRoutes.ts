import express from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController'
import { protect, adminOnly } from '../middleware/authMiddleware'

// Router is like a mini Express app that handles a group of related routes
const router = express.Router()

// PUBLIC ROUTES - anyone can browse products without logging in
router.get('/', getAllProducts)          // GET /api/products (supports ?category= filter)
router.get('/:id', getProductById)      // GET /api/products/:id

// ADMIN ONLY ROUTES - must be logged in AND be an admin
router.post('/', protect, adminOnly, createProduct)       // POST   /api/products
router.put('/:id', protect, adminOnly, updateProduct)     // PUT    /api/products/:id
router.delete('/:id', protect, adminOnly, deleteProduct)  // DELETE /api/products/:id

export default router
