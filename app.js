// Require node_modules
const express = require('express')
const mongoose = require('mongoose')
const exphdbs = require('express-handlebars')
const Restaurant = require('./models/restaurant-list')

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

/* --------------Setting express-handlebars-------------- */
app.engine('hbs', exphdbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
/* ------------------------------------------------------ */

// setting static files
app.use(express.static('public'))

// Handle request and response
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// Read : View details of a restaurant
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// Start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listen on http://localhost:${port}`)
})
