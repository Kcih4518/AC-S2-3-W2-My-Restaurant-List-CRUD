const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant-list')
const sortList = require('../../models/sorts/sortList.json')

// Read : View all the restaurants
// TODO: Error handle : When cannot get DB data
router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants, sortList }))
    .catch((error) => console.log(error))
})

module.exports = router
