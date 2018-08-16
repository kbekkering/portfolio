let mongoose = require('mongoose');

let videoSchema = new mongoose.Schema({
  title: String,
  embedCode: String,
  year: Number,
  description: String
});

module.exports = mongoose.model('Video', videoSchema);
