import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import orderRoutes from './routes/orderRoutes'
import contactRoutes from './routes/contactRoutes'

// Load environment variables from .env file
dotenv.config()



const app = express()

// Middleware - allows server to accept JSON and cross-origin requests
app.use(cors())
app.use(express.json())
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/contact', contactRoutes)

// Test route - just to confirm server is running
app.get('/', (req, res) => {
  res.json({ message: 'Furniture API is running 🚀' })
})

// Connect to MongoDB then start the server
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB Connected')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err)
  })

export default app