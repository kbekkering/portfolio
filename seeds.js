let mongoose = require('mongoose');
let Video = require('./models/video');

let videoData = [
  {
    title: 'USA 2017 part 1',
    embedCode: 'QyqXLoTZqmY',
    year: 2017,
    description: 'The first part of our 2017 trip to the USA, covering a bit of LA, Channel Islands NP, Pinnacles NP and Sequoia NP'
  }, 
  {
    title: 'Berlin 2018',
    embedCode: 'zCP_t7WmFO8',
    year: 2018,
    description: 'Weekendtrip to our capital!'
  }
];

function seedDB() {
  videoData.forEach((seed) => {
    Video.create(seed, (err, video) => {
      if (err) {
        console.log(err);
      } else {
        console.log(video);
      }
    });
  });
};

module.exports = seedDB;
