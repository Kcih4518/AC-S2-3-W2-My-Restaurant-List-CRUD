// Require node_modules
const mongoose = require('mongoose')

// Define restaurant schema
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    default: 'Your'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Export module
module.exports = mongoose.model('User', userSchema)
