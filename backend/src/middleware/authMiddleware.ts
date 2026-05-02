import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Extending the Request type to include our user data
interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}

// PROTECT - checks if the user is logged in
export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from request headers
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }

    // Verify the token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string }

    // Attach user info to the request so the next function can use it
    req.user = decoded

    next() // move on to the actual route handler

  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token' })
  }
}

// ADMIN ONLY - checks if the logged in user is an admin
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admins only' })
  }
  next()
}
