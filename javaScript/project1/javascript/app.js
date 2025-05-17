//TODO DOM Variables
const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const gameSection = document.querySelector(".game-section");
const gameBox = document.querySelector(".game-box");
const optionList = document.querySelector(".option-list");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-bnt");
const goHomeBtn = document.querySelector(".goHome-btn");
const nextBtn = document.querySelector(".next-btn");

//TODO Global Variables
let questionCount = 0;
// let questionNum = 1;
let userScore = 0;
let questionAnswered = 0;

//TODO Onclick Events
startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  gameSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  gameBox.classList.add("active");
  showQuestion(0);
  questionCounter(0);
};

tryAgainBtn.onclick = () => {
  //reset the values
  questionCount = 0;
  userScore = 0;
  questionAnswered = 0;
  //rerender the questions
  showQuestion(questionCount);
  questionCounter(questionCount);
  headerScore();
  //exit all pages and open game
  gameBox.classList.add("active");
  resultBox.classList.remove("active");
  nextBtn.classList.remove("active");
};

goHomeBtn.onclick = () => {
  //reset the values
  questionCount = 0;
  userScore = 0;
  questionAnswered = 0;
  //rerender the questions
  showQuestion(questionCount);
  questionCounter(questionCount);
  headerScore();
  //exit all pages and open home
  gameSection.classList.remove("active");
  resultBox.classList.remove("active");
  nextBtn.classList.remove("active");
};

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestion(questionCount);
    questionCounter(questionCount);
    headerScore();
    //reset the next button
    nextBtn.classList.remove("active");
  } else {
    console.log("Questions Completed");
    showResultBox();
  }
};
//TODO Functions
//get the questions and the options from the array
function showQuestion(index) {
  //get the element
  const questionText = document.querySelector(".question-text");
  //change here text
  questionText.textContent = `${questions[index].num}. ${questions[index].question}`;
  //get the options
  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>`;
  //put the options in optionList (div) create new elements
  optionList.innerHTML = optionTag;
  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    //add function for each option
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  //answer is an element
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;
  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore += questions[questionCount].score;
    questionAnswered++;
    headerScore();
  } else {
    answer.classList.add("incorrect");
    //if the user select incorrect answer then auto selected the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
    // decrease the score by points
    userScore -= questions[questionCount].dieScore;
    //check if score less than 0 then change it to 0
    if (userScore < 0) {
      userScore = 0;
    }
  }
  //if user selected then all options disabled
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index + 1} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore} / 1M`;
}

function showResultBox() {
  gameBox.classList.remove("active");
  resultBox.classList.add("active");
  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} Of 1M and correct answers is ${questionAnswered} of ${questions.length}`;
  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndValue = (questionAnswered / questions.length) * 100;
  let speed = 35;
  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#7bf03d ${
      progressStartValue * 3.6
    }deg, rgba(255, 255, 255, 0.1) 0deg)`;
    if (progressStartValue >= progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
