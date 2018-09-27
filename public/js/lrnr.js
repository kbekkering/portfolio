// grab solution from rendered page
let solution = document.getElementById('solution').innerHTML;

// grab options from rendered page
let options = Array.from(document.getElementsByClassName('options'));

let answerCorrect = function (target) {
  target.classList.add('correct');
  window.setTimeout(function() { 
    location.reload(); 
  }, 500);
};

let answerWrong = function (target) {
  target.classList.add('wrong');
};

let showSolution = function () {
  options.forEach((option) => {
    if (option.innerHTML === solution) {
      answerCorrect(option);
    } else {
      answerWrong(option);
    }
  });
};

options.forEach((option) => {
  option.addEventListener('click', () => {
    showSolution();
  });
});
