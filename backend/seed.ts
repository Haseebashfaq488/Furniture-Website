import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './src/models/Product'

dotenv.config()

const seedProducts = [
  {
    name: "Modern Sofa",
    description: "A comfortable modern sofa.",
    price: 499.99,
    category: "Sofa",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    stock: 10
  },
  {
    name: "Classic Wooden Table",
    description: "A classic wooden dining table.",
    price: 299.99,
    category: "Table",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80",
    stock: 5
  },
  {
    name: "Ergonomic Office Chair",
    description: "Keep your posture perfect with this chair.",
    price: 199.99,
    category: "Chair",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80",
    stock: 20
  },
  {
    name: "Queen Size Bed",
    description: "Sleep like a queen.",
    price: 799.99,
    category: "Bed",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80",
    stock: 3
  }
]

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('Connected to DB')
    await Product.deleteMany({}) // Clear existing just in case
    await Product.insertMany(seedProducts)
    console.log('Products seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

runSeed()
