const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant-list')

// Create : Add a restaurant form
router.get('/add', (req, res) => {
  Restaurant.distinct('category')
    .lean()
    .then((categories) => {
      res.render('add', { categories })
    })
    .catch((error) => console.log(error))
})

// Create: Add a new restaurant
// TODO: Error handle : When cannot be established normally
// TODO: When non-essential data is empty, fill in the default value.
router.post('/', (req, res) => {
  const restaurant = req.body
  if (!restaurant.image) {
    restaurant.image =
      'https://nicswafford.files.wordpress.com/2020/04/food.jpg'
  }

  if (!restaurant.google_map) {
    restaurant.google_map = 'https://www.google.com.tw/maps/'
  }

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

// Read: Search restaurant (name 、category)
// MongoDB $regex ref: https://docs.mongodb.com/manual/reference/operator/query/regex/
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()

  if (!keyword.length) {
    return res.render('index', { error: 'Please enter keywords !!!' })
  }

  Restaurant.find({
    $or: [
      { category: { $regex: keyword, $options: 'i' } },
      { name: { $regex: keyword, $options: 'i' } },
    ],
  })
    .lean()
    .then((restaurants) => {
      if (!restaurants.length) {
        return res.render('index', {
          error: `很抱歉，沒有找到與 ${keyword} 相關的餐廳!!`,
          keyword,
        })
      }
      res.render('index', { restaurants, keyword })
    })
    .catch((error) => console.log(error))
})

// Read : View details of a restaurant
// TODO: Error handle : When cannot get DB data
// TODO: Change "show" to "detail"
// TODO: Show restaurant english name
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// Update : View restaurant edit form
// TODO: Can reduce process be queried only once?
// TODO: Error handle : When cannot get DB data
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => {
      Restaurant.distinct('category')
        .lean()
        .then((categories) => {
          res.render('edit', { restaurant, categories })
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
})

// Update : Modify restaurant info in DB data
// TODO: Error handle : When cannot update DB data
router.put('/:id', (req, res) => {
  const id = req.params.id
  const restaurantUpdateInfo = req.body
  Restaurant.findById(id)
    .then((restaurant) => {
      for (const key in restaurantUpdateInfo) {
        if (restaurantUpdateInfo[key]) {
          restaurant[key] = restaurantUpdateInfo[key]
        }
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// Delete : Remove restaurant info card and DB data
// TODO: Error handle : When cannot delete DB data
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
