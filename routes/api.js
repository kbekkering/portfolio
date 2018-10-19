const express = require('express');
let router = express.Router();
const Word = require('../models/word');

router.get('/', (req, res) => {
  Word.find({}, (err, allWords) => {
    if (err) {
      console.log(err);
    } else {
      res.json(allWords);
    }
  });
});

module.exports = router;
