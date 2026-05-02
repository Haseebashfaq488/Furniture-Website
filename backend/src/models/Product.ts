import mongoose, { Document } from 'mongoose'

// TypeScript interface — describes the shape of a Product document
export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: 'Sofa' | 'Bed' | 'Table' | 'Chair' | 'Other'
  image: string
  stock: number
  ratings: {
    average: number
    count: number
  }
}

// This defines the structure of every product stored in the database
const productSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true  // every product must have a name
  },
  description: {
    type: String,
    required: true  // describe what the product is
  },
  price: {
    type: Number,
    required: true  // price in the store's currency
  },
  category: {
    type: String,
    enum: ['Sofa', 'Bed', 'Table', 'Chair', 'Other'],  // only these furniture categories allowed
    required: true
  },
  image: {
    type: String,  // URL or path to the product image
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0  // how many units are available
  },
  ratings: {
    average: {
      type: Number,
      default: 0    // starts at 0, updates as reviews come in
    },
    count: {
      type: Number,
      default: 0    // total number of ratings received
    }
  }
}, {
  timestamps: true  // automatically adds createdAt and updatedAt fields
})

// This creates the actual model from the schema
const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product
