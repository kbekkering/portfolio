require('dotenv').config();

const expressSanitizer = require('express-sanitizer');
const methodOverride = require('method-override');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const User = require('./models/user');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const app = express();
const flash = require('connect-flash');
// const seedDB = require('./seeds');

mongoose.connect(process.env.DATABASEURL); // mongodb, currently running on mlab
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
app.use(flash());

// seedDB(); // seed the DB

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'Koen wants to learn',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  // Make currentUser available in all views
  res.locals.currentUser = req.user;
  // make flash error & success messages available in all views
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
let videoRoutes = require('./routes/videos');
let indexRoutes = require('./routes/index');
app.use('/', indexRoutes);
app.use('/videos', videoRoutes);

app.listen(process.env.PORT, function() {
  console.log('Portfolio server is running on http://localhost:' + process.env.PORT);
});
