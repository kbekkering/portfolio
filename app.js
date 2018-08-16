require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seeds');

mongoose.connect(process.env.DATABASEURL); // mongodb, currently running on mlab
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let Video = require('./models/video');

// seedDB(); // seed the DB

app.use('/videos', (req, res) => {
  Video.find({}, (err, allVideos) => {
    if (err) {
      console.log(err);
    } else {
      res.render('videos', { videos: allVideos });
    }
  });
});

app.use('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT, function() {
  console.log('Portfolio server is running on http://localhost:' + process.env.PORT);
});
