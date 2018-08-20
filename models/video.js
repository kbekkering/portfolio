let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let videoSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: false },
  embedCode: { type: String, required: true, unique: true },
  year: { type: Number, required: true, unique: false },
  description: { type: String, required: true, unique: false }
});

videoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Video', videoSchema);
