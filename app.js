// TODO: Add sorting feature: rating、category、name (A-Z) 、name (Z-A)
// TODO: Make sure all route paths are correct
// Require node_modules
const express = require('express')
const mongoose = require('mongoose')
const exphdbs = require('express-handlebars')
const turnOnAddButton = require('./helpers/handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

// Define server info
const port = 3000

// Setting express
const app = express()

// Setting mongoose
// TODO: Do more db error handling (like retry )
// TODO: Package the mongoose connection into a module
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// Setting express-handlebars
app.engine(
  'hbs',
  exphdbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: { turnOnAddButton },
  })
)
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// Setting body-parser
app.use(express.urlencoded({ extended: true }))

// Setting middleware: method-override
app.use(methodOverride('_method'))

// Setting Express router and import request into router
app.use(routes)

// Start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listen on http://localhost:${port}`)
})
