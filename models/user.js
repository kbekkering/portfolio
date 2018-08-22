let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false, unique: false }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
