const express = require('express');
const User = require('../models/user');
let router = express.Router();
const passport = require('passport');
const populateYears = require('../modules/middleware/populateYears');

// Registration routes
router.get('/register', populateYears, (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log(err);
      res.send('oops');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/videos');
      });
    }
  });
});

// Login routes
router.get('/login', populateYears, (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/videos',
    failureRedirect: '/login'
  }
));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/videos');
});

// Root route
router.get('/', populateYears, (req, res) => {
  res.render('index', { page: 'index' });
});

module.exports = router;
