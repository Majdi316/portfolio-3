import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper.js";
const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 6;
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const mineLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.appendChild(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd()
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
mineLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
  mineLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }
  if (win) {
    messageText.textContent = "YOU WIN";
    winGame()

  }
  if (lose) {
    messageText.textContent = "YOU LOSE";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) {
          markTile(tile);
        }
        if (tile.mine) {
          revealTile(board, tile);
        }
      });
    });
    gameOver()
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}

let tryAgainButton = document.createElement("button");
let buttonText = document.createTextNode(`try again`);
tryAgainButton.classList.add("try-again-btn");

function gameOver() {

  let popup = document.createElement("div");
  let text = document.createTextNode(`Game over`);
  tryAgainButton.appendChild(buttonText);
  popup.appendChild(text);
  popup.classList.add("popup");
  popup.appendChild(tryAgainButton);
  document.body.appendChild(popup);
}
tryAgainButton.addEventListener("click", () => {
  location.reload();
});
function winGame() {
  let popupWin = document.createElement("div");
  let text = document.createTextNode(`Congratulations YOU WIN !!!`);
  tryAgainButton.appendChild(buttonText);
  popupWin.appendChild(text);
  popupWin.classList.add("popup-win");
  popupWin.appendChild(tryAgainButton);
  document.body.appendChild(popupWin);
}
