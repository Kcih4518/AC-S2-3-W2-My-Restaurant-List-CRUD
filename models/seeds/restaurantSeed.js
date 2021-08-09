// Require node_modules
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restaurantListJson = require('./restaurant.json').results
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantList: restaurantListJson.slice(0, 3)
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantList: restaurantListJson.slice(4, 7)
  }
]

// Setting mongoose
/// Connection successfully handling
db.once('open', () => {
  Promise.all(
    Array.from(SEED_USERS, (SEED_USER, i) => {
      const restaurantList = SEED_USER.restaurantList
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(SEED_USER.password, salt))
        .then((hash) =>
          User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          })
        )
        .then((user) => {
          const userId = user._id
          restaurantList.forEach((restaurant) => (restaurant.userId = userId))
          return Restaurant.create(restaurantList)
        })
    })
  )
    .then(() => {
      console.log('Import restaurant data into database successfully!')
      process.exit()
    })
    .catch((err) => console.log(err))
})
