const express= require('express');
let Video = require('../../models/video');


function populateYears (req, res, next) {
  Video.find({}, (err, allVideos) => {
    res.locals.years = allVideos.map((video) => video.year).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).sort().reverse();
    next();
  });
}

module.exports = populateYears;
