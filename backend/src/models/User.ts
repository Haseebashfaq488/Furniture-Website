import mongoose from 'mongoose'

// This defines the structure of every user stored in the database
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true  // can't register without a name
  },
  email: {
    type: String,
    required: true,
    unique: true    // no two users can have the same email
  },
  password: {
    type: String,
    required: true  // will be encrypted before saving
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // only these two values allowed
    default: 'user'           // everyone is a regular user by default
  }
}, {
  timestamps: true  // automatically adds createdAt and updatedAt fields
})

// This creates the actual model from the schema
const User = mongoose.model('User', userSchema)

export default User