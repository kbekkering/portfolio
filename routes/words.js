const express = require('express');
let router = express.Router();
const populateYears = require('../modules/middleware/populateYears');
const Word = require('../models/word');
const lrnr = require('../modules/lrnr');

// LRNR route
router.get('/', populateYears, (req, res) => {
  Word.find({}, (err, allWords) => {
    if (err) { 
      console.log(err);
      req.flash('error', err);
      res.redirect('back');
    } else {
      res.render('lrnr', { words: allWords, displayWord: allWords[0], lrnr: lrnr });
    }
  });
});

// LIST all words route
router.get('/words', populateYears, (req, res) => {
  Word.find({}, (err, allWords) => {
    if (err) {
      console.log(err);
      req.flash('error', err);
      res.redirect('back');
    } else {
      res.render('words/index', { words: allWords });
    }
  });
});

// NEW words route
router.get('/new', populateYears, (req, res) => {
  res.render('words/new');
});

// CREATE word route
router.post('/new', (req, res) => {
  let newWord = {
    english: req.body.english,
    german: req.body.german
  };
  Word.create(newWord, (err, savedWord) => {
    if (err) {
      console.log(err);
      req.flash('error', err);
      res.redirect('back');
    } else {
      req.flash('success', `${savedWord.english}/${savedWord.german} was saved`);
      res.redirect('/lrnr/new');
    }
  });
});

// EDIT word route
router.get('/:id/edit', populateYears, (req, res) => {
  Word.findById(req.params.id, (err, foundWord) => {
    if (err) {
      console.log(err);
      req.flash('error', err);
      res.redirect('back');
    } else {
      console.log(foundWord.english);
      res.render('words/edit', { word: foundWord });
    }
  });
});

// UPDATE word route
router.put('/:id', (req, res) => {
  Word.findByIdAndUpdate(req.params.id, req.body.word, (err, updatedWord) => {
    if (err) {
      console.log(err);
      req.flash('error', err);
      res.redirect('back');
    } else {
      req.flash('success', `${updatedWord.english}/${updatedWord.german} was updated`);
      res.redirect('/lrnr');
    }
  });
});

// DELETE word route
router.delete('/:id', (req, res) => {
  Word.findByIdAndRemove(req.params.id, (err, deletedWord) => {
    if (err) {
      console.log(err);
      req.flash('error', err);
      res.redirect('back');
    } else {
      req.flash('success', `${deletedWord.english}/${deletedWord.german} was deleted`);
      res.redirect('/lrnr');
    }
  });
});

// single page lrnr
router.get('/single', populateYears, (req, res) => {
  res.render('single-page-lrnr');
});


module.exports = router;
