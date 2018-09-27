const Word = require('../models/word');

let lrnr = {};

lrnr.getAllWords = function() {
  Word.find({}, (err, allWords) => {
    if (err) {
      return err;
    } 
    return allWords;
  });
};

lrnr.displayWord = function (arr) {
  let random = Math.floor(Math.random() * arr.length);
  return arr[random];
};

lrnr.generateQuestion = function (arr) {
  let numsArr = [];
  while (numsArr.length < 3) {
    let num = Math.floor(Math.random() * arr.length);
    if (numsArr.indexOf(num) > -1) { 
      continue;
    };
    numsArr.push(num);
  }

  let question = {
    english: arr[numsArr[0]].english,
    options: [],
    solution: arr[numsArr[0]].german
  };

  // make optionsArray
  let optionsArr = [ 
    arr[numsArr[0]].german,
    arr[numsArr[1]].german,
    arr[numsArr[2]].german
  ];
  // pick random item from array
  while (optionsArr.length > 0) {
    let num = Math.floor(Math.random() * optionsArr.length);
    // push random item to question.options
    question.options.push(optionsArr[num]);
    // remove that item from optionsArray
    optionsArr.splice(num, 1);
  }

  return question;
};


module.exports = lrnr;
