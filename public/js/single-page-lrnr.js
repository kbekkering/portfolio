let btn = document.querySelector('#btn');
let wordDisplay = document.querySelector('#word');
let optionsDisplay = document.querySelectorAll('.options');

let url = 'https://api.myjson.com/bins/14te0o';
let allWords = [];
let question = {};

// get all words from API
function getAllWords() {
  let XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4 && XHR.status === 200) {
      allWords = JSON.parse(XHR.responseText);
    }
  };
  XHR.open('GET', url);
  XHR.send();
}
getAllWords();

// generate the question
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
    console.log(`i = ${i}`);
    optionsDisplay[i].innerHTML = question.options[i];
  }
}

btn.addEventListener('click', function() {
  generateQuestion();
});
