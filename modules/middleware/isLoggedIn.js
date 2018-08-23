let isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'Please Login first');
    res.redirect('/login');
  }
};

module.exports = isLoggedIn;
