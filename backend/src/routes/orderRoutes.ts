import express from 'express'
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController'
import { protect, adminOnly } from '../middleware/authMiddleware'

// Router is like a mini Express app that handles a group of related routes
const router = express.Router()

// USER ROUTES - must be logged in
router.post('/', protect, placeOrder)              // POST /api/orders        - place a new order
router.get('/my-orders', protect, getUserOrders)  // GET  /api/orders/my-orders - view own orders
router.get('/:id', protect, getOrderById)          // GET  /api/orders/:id    - view a single order

// ADMIN ONLY ROUTES - must be logged in AND be an admin
router.get('/', protect, adminOnly, getAllOrders)                    // GET   /api/orders          - all orders
router.put('/:id/status', protect, adminOnly, updateOrderStatus)    // PUT   /api/orders/:id/status

export default router
