import express from 'express'
import { register, login } from '../controllers/authController'
import { protect } from '../middleware/authMiddleware'

// Router is like a mini Express app that handles a group of related routes
const router = express.Router()

// PUBLIC ROUTES - no login required
router.post('/register', register)  // POST /api/auth/register
router.post('/login', login)        // POST /api/auth/login

// PROTECTED ROUTE - must be logged in
// This is just a test route to verify token works
router.get('/me', protect, (req, res) => {
  res.json({ message: 'You are logged in', user: (req as any).user })
})

export default router