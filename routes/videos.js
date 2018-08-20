const express = require('express');
let router = express.Router();
let Video = require('../models/video');
let sortByKey = require('../public/js/sortByKey');

// INDEX route
router.get('/', (req, res) => {
  Video.find({}, (err, allVideos) => {
    let sortedVideos = sortByKey(allVideos, 'year').reverse();
    let uniqueYears = sortedVideos.map((video) => video.year).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
    let testVideos = allVideos.sort(function(video1, video2) {
      if (video1.year > video2.year) {return -1};
      if (video1.year < video2.year) {return 1};
      if (video1.number > video2.number) {return 1};
      if (video1.number < video2.number) {return -1};
    });
    if (err) {
      console.log(err);
    } else {
      res.render('videos/index', { videos: testVideos, years: uniqueYears, page: 'videos', type: '' });
    }
  });
});

// NEW video route
router.get('/new', function(req, res) {
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
router.get('/:id/edit', (req, res) => {
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
      res.send('oops, something went wrong');
    } else {
      console.log(newlyCreated);
      res.redirect('/videos');
    }
  });
});

// UPDATE route
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
