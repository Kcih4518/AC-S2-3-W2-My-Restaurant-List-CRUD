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

/* --------------Setting express-handlebars-------------- */
app.engine('hbs', exphdbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// Setting body-parser
app.use(express.urlencoded({ extended: true }))

// Handle request and response

// Create : Add a restaurant form
app.get('/restaurants/add', (req, res) => {
  Restaurant.distinct('category')
    .lean()
    .then((categories) => {
      res.render('add', { categories })
    })
    .catch((error) => console.log(error))
})

// Create: Add a new restaurant
app.post('/restaurants', (req, res) => {
  const restaurant = req.body
  Restaurant.create({
    name: restaurant.name,
    name_en: restaurant.name_en,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.google_map,
    rating: restaurant.rating,
    description: restaurant.description,
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Read : View all the restaurants
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

// Delete : Remove restaurant info card and db data
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listen on http://localhost:${port}`)
})
