// Require node_modules
const restaurantListJson = require('./restaurant.json')
const Restaurant = require('../restaurant-list')
const mongoose = require('mongoose')

// Setting mongoose
// TODO: Encapsulate db connection into a module
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
// TODO: Can also use map + join experiment instead
// FIXME: Maybe also need import restaurant.id into database
db.once('open', () => {
  const restaurantListData = restaurantListJson.results
  restaurantListData.forEach((restaurant) => {
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
  })
  console.log('Import restaurant data into database successfully!')
})
