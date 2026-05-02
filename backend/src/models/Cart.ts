import mongoose, { Document, Types } from 'mongoose'

// TypeScript interface — describes the shape of a single cart item
export interface ICartItem {
  productId: Types.ObjectId
  quantity: number
}

// TypeScript interface — describes the shape of a Cart document
export interface ICart extends Document {
  userId: Types.ObjectId
  items: ICartItem[]
  totalPrice: number
}

// This defines the structure of a user's shopping cart
const cartSchema = new mongoose.Schema<ICart>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',    // links to the User model
    required: true,
    unique: true    // each user has only one cart
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // links to the Product model
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,   // can't have 0 or negative items in a cart
        default: 1
      }
    }
  ],
  totalPrice: {
    type: Number,
    default: 0  // recalculated every time items change
  }
}, {
  timestamps: true  // automatically adds createdAt and updatedAt fields
})

// This creates the actual model from the schema
const Cart = mongoose.model<ICart>('Cart', cartSchema)

export default Cart
