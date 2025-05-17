//DOM Variables
const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
//Board Variables
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
//Paddle Variables
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const paddleSpeed = 50;
let paddle1 = {
  width: 25,
  hight: 100,
  x: 0,
  y: 0,
};
let paddle2 = {
  width: 25,
  hight: 100,
  x: gameWidth - 25,
  y: gameHeight - 100,
};
//Ball Variables
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
//Players Variables
let player1Score = 0;
let player2Score = 0;
let intervalID;

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
gameStart();
//Functions
function gameStart() {
  createBall();
  nextTick();
}

function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}

function clearBoard() {
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles() {
  context.strokeStyle = paddleBorder;
  //paddle1
  context.fillStyle = paddle1Color;
  context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.hight);
  context.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.hight);
  //paddle2
  context.fillStyle = paddle2Color;
  context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.hight);
  context.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.hight);
}

function createBall() {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}

function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}

function drawBall(ballX, ballY) {
  context.fillStyle = ballColor;
  context.strokeStyle = ballBorderColor;
  context.lineWidth = 2;
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  context.stroke();
  context.fill();
}

function checkCollision() {
  //collision in board border
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    player2Score++;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    player1Score++;
    updateScore();
    createBall();
    return;
  }
  //collision on paddles
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.hight) {
      ballX = paddle1.x + paddle1.width + ballRadius;
      ballXDirection *= -1;
      ballSpeed += 0.5;
    }
  }
  if (ballX > paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.hight) {
      ballX = paddle2.x - ballRadius;
      ballXDirection *= -1;
      ballSpeed += 0.5;
    }
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;
  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;
    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.hight) {
        paddle1.y += paddleSpeed;
      }
      break;
    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;
    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.hight) {
        paddle2.y += paddleSpeed;
      }
      break;

    default:
      break;
  }
}

function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2Score}`;
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    hight: 100,
    x: 0,
    y: 0,
  };
  paddle2 = {
    width: 25,
    hight: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
  };
  ballSpeed = 1;
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
}
