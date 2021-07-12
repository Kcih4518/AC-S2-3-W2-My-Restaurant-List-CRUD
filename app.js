// Require node_modules
const express = require('express')
const mongoose = require('mongoose')

// Define server info
const port = 3000

// Setting express
const app = express()

// Setting mongoose
// TODO: Do more db error handling (like retry )
/* ------------------------------------------------------ */
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

/// Get database connection status
const db = mongoose.connection

/// Connection exception handling
db.on('error', () => {
  console.log('mongodb error!')
})

/// Connection successfully handling
db.once('open', () => {
  console.log('mongodb connected!')
})
/* ------------------------------------------------------ */

// Handle request and response
app.get('/', (req, res) => {
  res.send('hello from simple server :)')
})

// Start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listen on http://localhost:${port}`)
})
