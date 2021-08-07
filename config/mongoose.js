const mongoose = require('mongoose')

// Setting mongoose
// TODO: Do more db error handling (like retry )
// TODO: Package the mongoose connection into a module
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// 1. Get database connection status
const db = mongoose.connection

// 2. Connection exception handling
db.on('error', () => {
  console.log('mongodb error!')
})

// 3. Connection successfully handling
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
