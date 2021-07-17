// TODO: Add sorting feature: rating、category、name (A-Z) 、name (Z-A)
// TODO: Make sure all route paths are correct
// Require node_modules
const express = require('express')
const exphdbs = require('express-handlebars')
const isEqual = require('./helpers/handlebars')
const isTurnOnAddButton = require('./helpers/handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
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
    helpers: { isTurnOnAddButton, isEqual },
  })
)
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// Setting body-parser
app.use(express.urlencoded({ extended: true }))

// Setting middleware: method-override
app.use(methodOverride('_method'))

// Setting Express router and import request into router
app.use(routes)

// Start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listen on http://localhost:${port}`)
})
