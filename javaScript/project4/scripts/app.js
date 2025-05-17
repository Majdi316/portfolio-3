//TODO DOM Variables
const playBoarder = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
//---------------------------------------------------
//TODO Global Variables
let gameOver = false;
let foodX;
let foodY;
let dieFoodX;
let dieFoodY;
let dieFoodScore = 2;
let snakeX = 5;
let snakeY = 10;
let snakeBody = [];
let velocityX = 0;
let velocityY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
//---------------------------------------------------
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
//---------------------------------------------------
const changeDieFoodPosition = () => {
  dieFoodX = Math.floor(Math.random() * 30) + 1;
  dieFoodY = Math.floor(Math.random() * 30) + 1;
};
//---------------------------------------------------
let tryAgainButton = document.createElement("button");
let buttonText = document.createTextNode(`try again`);
tryAgainButton.classList.add("try-again-btn");
const handleGameOver = () => {
  document.getElementById("lose").play();
  clearInterval(setIntervalId);
  let popup = document.createElement("div");
  let text = document.createTextNode(`Game over`);
  tryAgainButton.appendChild(buttonText);
  popup.appendChild(text);
  popup.classList.add("popup");
  popup.appendChild(tryAgainButton);
  document.body.appendChild(popup);
};
tryAgainButton.addEventListener("click", () => {
  location.reload();
});
//---------------------------------------------------
controls.forEach((key) => {
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key })
  );
});
//---------------------------------------------------
const changeDirection = (event) => {
  if (event.key == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.key == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (event.key == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (event.key == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
//---------------------------------------------------
const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  let dieHtmlMarkup = `<div class="die-food" style="grid-area: ${dieFoodY} / ${dieFoodX}"></div>`;
  //---------------------------------------------------
  if (snakeX === foodX && snakeY === foodY) {
    document.getElementById("eat").play();
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }
  //---------------------------------------------------
  if (snakeX === dieFoodX && snakeY === dieFoodY) {
    document.getElementById("boom").play();
    changeDieFoodPosition();
    score -= dieFoodScore;
    snakeBody.pop();
    if (score < 0) {
      score = 0;
    }
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }
  //---------------------------------------------------
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  //---------------------------------------------------
  snakeBody[0] = [snakeX, snakeY];
  snakeX += velocityX;
  snakeY += velocityY;
  //---------------------------------------------------
  //check collision out of screen
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  //---------------------------------------------------
  //draw the snake
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    //check the collision the head and other body of snake
    //---------------------------------------------------
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
    //---------------------------------------------------
  }

  playBoarder.innerHTML = htmlMarkup + dieHtmlMarkup;
};
//---------------------------------------------------
changeFoodPosition();
changeDieFoodPosition();
setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
