const express = require('express');
let router = express.Router();
let Video = require('../models/video');

router.get('/', (req, res) => {
  Video.find({}, (err, allVideos) => {
    if (err) {
      console.log(err);
    } else {
      res.render('videos', { videos: allVideos });
    }
  });
});

module.exports = router;
