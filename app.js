const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/videos', (req, res) => {
  res.render('videos');
});

app.use('/', (req, res) => {
  res.render('index');
});

app.listen(3000, function() {
  console.log('Portfolio server is running on http://localhost:3000');
});
