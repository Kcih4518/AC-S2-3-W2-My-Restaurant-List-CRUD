// Require node_modules
const express = require('express')

// Define server info
const port = 3000

// Setting express
const app = express()

// Handle request and response
app.get('/', (req, res) => {
  res.send('hello from simple server :)')
})

// Start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listen on http://localhost:${port}`)
})
