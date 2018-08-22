const express = require('express');
const User = require('../models/user');
let router = express.Router();
const passport = require('passport');

// AUTH routes
router.get('/register', (req, res) => {
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

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/videos',
    failureRedirect: '/login'
  }
));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/videos');
});

router.get('/', (req, res) => {
  res.render('index', { page: 'index' });
});

module.exports = router;
