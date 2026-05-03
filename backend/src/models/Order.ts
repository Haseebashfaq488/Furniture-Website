import mongoose, { Document, Types } from 'mongoose'

// TypeScript interface — describes the shape of a single product line in an order
export interface IOrderItem {
  productId: Types.ObjectId
  quantity: number
}

// TypeScript interface — describes the shape of an Order document
export interface IOrder extends Document {
  userId: Types.ObjectId
  products: IOrderItem[]
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: string
}

// This defines the structure of every order placed in the store
const orderSchema = new mongoose.Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',    // links to the User who placed the order
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // links to the Product model
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1  // at least 1 unit per product
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true  // total cost of the entire order
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],  // order lifecycle stages
    default: 'pending'  // all orders start as pending
  },
  shippingAddress: {
    type: String,
    required: true  // where to deliver the order
  }
}, {
  timestamps: true  // automatically adds createdAt and updatedAt fields
})

// This creates the actual model from the schema
const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order
