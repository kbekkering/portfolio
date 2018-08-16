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

router.get('/new', function(req, res) {
  res.render('videos/new');
});

router.get('/:id', (req, res) => {
  Video.findById(req.params.id, (err, foundVideo) => {
    if (err) {
      console.log(err);
      res.send('Oops, something went wrong');
    } else {
      res.render('videos/show', { video: foundVideo });
    }
  });
});

router.post('/', (req, res) => {
  let newVideo = {
    title: req.body.title,
    embedCode: req.body.embedCode,
    year: req.body.year,
    description: req.body.description
  };
  Video.create(newVideo, (err, newlyCreated) => {
    if (err) {
      console.log(err);
      req.send('oops, something went wrong');
    } else {
      console.log(newlyCreated);
      res.render('videos/index');
    }
  });
});

module.exports = router;
