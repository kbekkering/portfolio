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

router.get('/:id', (req, res) => {
  Video.findById(req.params.id, (err, foundVideo) => {
    if (err) {
      console.log(err);
    } else {
      res.render('videos/show', { video: foundVideo });
    }
  });
});

module.exports = router;
