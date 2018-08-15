const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, function() {
  console.log('Portfolio server is running on http://localhost:3000');
});
