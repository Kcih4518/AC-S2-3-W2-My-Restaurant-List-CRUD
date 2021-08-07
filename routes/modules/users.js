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

// CREATE : Register a new user
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required.' })
  }
  if (password !== confirmPassword) {
    errors.push({
      message: 'The password does not match the confirmed password!'
    })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash
      })
    )
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
