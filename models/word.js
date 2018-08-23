let mongoose = require('mongoose');

let wordSchema = new mongoose.Schema({
  english: { type: String, required: true },
  german: { type: String, required: true }
});

module.exports = mongoose.model('Word', wordSchema);
