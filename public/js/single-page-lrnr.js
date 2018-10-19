let wordDisplay = document.querySelector('#word');
let optionsDisplay = Array.from(document.querySelectorAll('.options'));
let scoreDisplay = document.querySelector('#score');

let url = 'https://api.myjson.com/bins/14te0o';
let allWords = [];
let question = {};
let score = 0;

// DISPLAY A QUESTION 
// 
// Generate the question
function generateQuestion() {
  // select 3 words from allWords
  let indexArray = [];
  while (indexArray.length < 3) {
    // generate random index from allWords
    let index = Math.floor(Math.random() * allWords.length);
    // check if index already exists in indexArray, generate new one if not
    if (indexArray.indexOf(index) > -1) {
      continue;
    };
    // save into indexArray if unique
    indexArray.push(index);
  };

  // store selected word and translation
  question.english = allWords[indexArray[0]].english;
  question.german = allWords[indexArray[0]].german;

  // create array with all answer options
  let optionsArr = [
    allWords[indexArray[0]].german,
    allWords[indexArray[1]].german,
    allWords[indexArray[2]].german
  ];
  // store answer-options in random order to question.options
  question.options = [];
  while (optionsArr.length > 0) {
    let num = Math.floor(Math.random() * optionsArr.length);
    // push random item to question.options
    question.options.push(optionsArr[num]);
    // remove that item from optionsArray
    optionsArr.splice(num, 1);
  }

  // display question + answer-options
  wordDisplay.innerHTML = question.english;
  for (let i = 0; i < question.options.length; i++) {
    optionsDisplay[i].innerHTML = question.options[i];
  }
}

// KEEPING SCORE
let setScore = function (result) {
  if (result === 'reset' || result === 'wrong') {
    score = 0;
    scoreDisplay.innerHTML = score;
  } else if (result === 'correct') {
    score++;
    scoreDisplay.innerHTML = score;
  }
};

// GET ALL THE WORDS FROM API
function getAllWords() {
  let XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4 && XHR.status === 200) {
      allWords = JSON.parse(XHR.responseText);
      generateQuestion();
    }
  };
  XHR.open('GET', url);
  XHR.send();
}
getAllWords();

// RESET AND ASK NEW QUESTION
// 
function resetQuestion() {
  window.setTimeout(function() { 
    generateQuestion();
    optionsDisplay.forEach((option) => {
      option.classList.remove('wrong', 'correct', 'correction', 'fade');
      option.classList.add('choose');
    });
  }, 500);
}

// CHECK ANSWER
// 
// if correct: add .correct to clicked element
let answerCorrect = function (target) {
  target.classList.add('correct');
  target.classList.remove('choose');
  setScore('correct');
  resetQuestion();
};

// if false: add .wrong to clicked element
let answerWrong = function (target) {
  target.classList.toggle('wrong');
  target.classList.remove('choose');
  setScore('wrong');
  resetQuestion();
};

// add .correction to the correct answer
let answerCorrection = function (target) {
  target.classList.add('correction');
  target.classList.remove('choose');
};

// add .fade to wrong answer that wasn't clicked
let answerFade = function (target) {
  target.classList.add('fade');
  target.classList.remove('choose');
};

// logic to check if answer was correct
function checkAnswer(clickedAnswer) {
  optionsDisplay.forEach((option) => {
    if (clickedAnswer.innerHTML === option.innerHTML && clickedAnswer.innerHTML === question.german) {
      // the correct answer was clicked
      answerCorrect(option);
    } else if (option.innerHTML === question.german) {
      // this was the correct answer
      answerCorrection(option);
    } else if (clickedAnswer.innerHTML === option.innerHTML) {
      // the wrong answer was clicked
      answerWrong(option);
    } else {
      answerFade(option);
    }
  });
}

// SETUP PAGE FOR INTERACTION
// add listeners to options
optionsDisplay.forEach((option) => {
  option.addEventListener('click', function() {
    checkAnswer(option);
  });
});

// set scoreDisplay
setScore('reset');
