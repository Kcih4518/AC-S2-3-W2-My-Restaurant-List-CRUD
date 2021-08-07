const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')

// READ : Display login page
router.get('/login', (req, res) => {
  res.render('login')
})

// READ : Display register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
