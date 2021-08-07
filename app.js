// TODO: Add sorting feature: rating、category、name (A-Z) 、name (Z-A)
// TODO: Make sure all route paths are correct
// Require node_modules
const express = require('express')
const exphdbs = require('express-handlebars')
const handlebarsHelpers = require('./helpers/handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
require('./config/mongoose')

// Define server info
const port = 3000

// Setting express
const app = express()

// Setting express-handlebars
app.engine(
  'hbs',
  exphdbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: handlebarsHelpers
  })
)
app.set('view engine', 'hbs')

// Setting express-session
app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  })
)

// setting static files
app.use(express.static('public'))

// Setting body-parser
app.use(express.urlencoded({ extended: true }))

// Setting middleware: method-override
app.use(methodOverride('_method'))

// Setting passport.js
usePassport(app)

// Setting connect-flash
app.use(flash())

// Setting middleware to store info into res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// Setting Express router and import request into router
app.use(routes)

// Start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listen on http://localhost:${port}`)
})
