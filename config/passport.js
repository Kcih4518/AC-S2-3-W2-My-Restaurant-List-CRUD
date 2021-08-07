const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
  // Initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // Set local strategy
  // TODO: req.flash warning_msg
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) return done(null, false)
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) return done(null, false)
              return done(null, user)
            })
          })
          .catch((err) => done(err, false))
      }
    )
  )

  // Set serialization and deserialization
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
