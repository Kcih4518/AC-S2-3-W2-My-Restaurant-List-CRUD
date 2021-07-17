// Require node_modules
const restaurantListJson = require('./restaurant.json')
const Restaurant = require('../restaurant-list')

const db = require('../../config/mongoose')

// Setting mongoose
/// Connection successfully handling
// TODO: Can also use map + join experiment instead
// FIXME: Maybe also need import restaurant.id into database
db.once('open', () => {
  Restaurant.create(restaurantListJson.results).then(() => {
    db.close()
    console.log('Import restaurant data into database successfully!')
  })
})
