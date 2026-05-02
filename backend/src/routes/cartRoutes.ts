import express from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} from '../controllers/cartController'
import { protect } from '../middleware/authMiddleware'

// Router is like a mini Express app that handles a group of related routes
const router = express.Router()

// ALL CART ROUTES ARE PROTECTED - user must be logged in to manage their cart
router.get('/', protect, getCart)                       // GET    /api/cart
router.post('/', protect, addToCart)                    // POST   /api/cart
router.put('/', protect, updateCartItem)                // PUT    /api/cart
router.delete('/:productId', protect, removeCartItem)  // DELETE /api/cart/:productId

export default router
