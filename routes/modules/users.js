const express = require('express')
const router = express.Router()

// Read : Display login page
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router