const express = require('express');
let router = express.Router();
let Video = require('../models/video');
let sortByKeys = require('../modules/sortByKeys');
let isLoggedIn = require('../modules/middleware/isLoggedIn');
let populateYears = require('../modules/middleware/populateYears');

// INDEX route
router.get('/', populateYears, (req, res) => {
  Video.find({}, (err, allVideos) => {
    let sortedVideos = sortByKeys(allVideos, 'year', 'number');

    if (err) {
      console.log(err);
    } else {
      res.render('videos/index', { videos: sortedVideos, page: 'videos', type: '' });
    }
  });
});

// NEW video route
router.get('/new', isLoggedIn, function(req, res) {
  res.render('videos/new', { page: 'videos', type: '' });
});

// SHOW individual video route
router.get('/:id', (req, res) => {
  Video.findById(req.params.id, (err, foundVideo) => {
    if (err) {
      console.log(err);
      res.send('Oops, something went wrong');
    } else {
      res.render('videos/show', { video: foundVideo, page: 'videos', type: 'showvideo' });
    }
  });
});

// EDIT route
router.get('/:id/edit', isLoggedIn, (req, res) => {
  Video.findById(req.params.id, (err, foundVideo) => {
    if (err) {
      console.log(err);
      res.send('Oops, something went wrong');
    } else {
      res.render('videos/edit', { video: foundVideo, page: 'videos', type: '' });
    }
  });
});

// CREATE route
router.post('/', isLoggedIn, (req, res) => {
  let newVideo = {
    title: req.sanitize(req.body.title),
    embedCode: req.sanitize(req.body.embedCode),
    year: req.body.year,
    description: req.sanitize(req.body.description)
  };

  Video.create(newVideo, (err, newlyCreated) => {
    if (err) {
      console.log(err);
      res.send('oops, something went wrong');
    } else {
      console.log(newlyCreated);
      res.redirect('/videos');
    }
  });
});

// UPDATE route
router.put('/:id', isLoggedIn, (req, res) => {
  req.body.video.title = req.sanitize(req.body.video.title);
  req.body.video.embedCode = req.sanitize(req.body.video.embedCode);
  req.body.video.description = req.sanitize(req.body.video.description);
  Video.findByIdAndUpdate(req.params.id, req.body.video, (err, updatedVideo) => {
    if (err) {
      console.log(err);
      res.send('oops, something went wrong');
    } else {
      console.log(updatedVideo);
      res.redirect('/videos');
    }
  });
});

// DELETE route
router.delete('/:id', isLoggedIn, (req, res) => {
  Video.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
      res.send('oops, something went wrong');
    } else {
      res.redirect('/videos');
    }
  });
});

module.exports = router;
