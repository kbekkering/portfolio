const express = require('express');
const User = require('../models/user');
let router = express.Router();
const passport = require('passport');
const populateYears = require('../modules/middleware/populateYears');

// Registration routes
router.get('/register', populateYears, (req, res) => {
  res.render('register');
});

// router.post('/register', (req, res) => {
//   let newUser = new User({ username: req.body.username });
//   User.register(newUser, req.body.password, (err) => {
//     if (err) {
//       console.log(err);
//       res.send('oops');
//     } else {
//       passport.authenticate('local')(req, res, function() {
//         res.redirect('/videos');
//       });
//     }
//   });
// });

// Login routes
router.get('/login', populateYears, (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/videos',
    successFlash: 'logged in',
    failureRedirect: '/login',
    failureFlash: 'login failed, try again'
  }
));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'logged out');
  res.redirect('/videos');
});

// Root route
router.get('/', populateYears, (req, res) => {
  res.render('index', { page: 'index' });
});

router.get('*', populateYears, (req, res) => {
  req.flash('error', 'that url does not exist');
  res.render('index', { page: 'index' });
});

module.exports = router;
