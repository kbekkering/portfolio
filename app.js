require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASEURL); // mongodb, currently running on mlab
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/videos', (req, res) => {
  res.render('videos');
});

app.use('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT, function() {
  console.log('Portfolio server is running on http://localhost:' + process.env.PORT);
});
