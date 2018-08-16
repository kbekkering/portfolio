require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const seedDB = require('./seeds');

mongoose.connect(process.env.DATABASEURL); // mongodb, currently running on mlab
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// seedDB(); // seed the DB

let videoRoutes = require('./routes/videos');
let indexRoutes = require('./routes/index');

app.use('/', indexRoutes);
app.use('/videos', videoRoutes);

app.listen(process.env.PORT, function() {
  console.log('Portfolio server is running on http://localhost:' + process.env.PORT);
});
