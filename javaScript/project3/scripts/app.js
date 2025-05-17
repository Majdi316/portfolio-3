//TODO Start Game
document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Enter Your Name?");
  let nameWithoutSpaces = yourName.trim();
  if (
    nameWithoutSpaces == null ||
    nameWithoutSpaces == "" ||
    nameWithoutSpaces == " "
  ) {
    document.querySelector(".name span").innerHTML = "UnKnown";
  } else {
    document.querySelector(".name span").innerHTML = nameWithoutSpaces;
  }
  document.querySelector(".control-buttons").remove();
};
//TODO DOM  Variables
let blocksContainer = document.querySelector(".memory-game-container");
//TODO global variables
let wrongTries = 0;
let trueTries = 0;
let duration = 1000;
//array of divs
let arrayOfBlocks = Array.from(blocksContainer.children);
//array of indexes
let range = Array.from(Array(arrayOfBlocks.length).keys());
//change the indexes
randomIndexes(range);

//change the order of each div
arrayOfBlocks.forEach((block, blockIndex) => {
  block.style.order = range[blockIndex];
  block.addEventListener("click", () => {
    rotateBlock(block);
  });
});

function rotateBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allRotateBlocks = arrayOfBlocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allRotateBlocks.length == 2) {
    stopClick();
    isMatched(allRotateBlocks[0], allRotateBlocks[1]);
  }
}

function stopClick() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function isMatched(first, second) {
  let triesElement = document.querySelector(".tries span");

  if (first.dataset.tech === second.dataset.tech) {
    trueTries++;
    document.getElementById("success").play();
    first.classList.remove("is-flipped");
    second.classList.remove("is-flipped");
    first.classList.add("has-match");
    second.classList.add("has-match");
    if (trueTries === 10) {
      blocksContainer.classList.add("finished");
      winGame();
    }
  } else {
    wrongTries++;
    triesElement.innerHTML = wrongTries;
    document.getElementById("fail").play();
    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
    }, duration);
    if (wrongTries === 10) {
      blocksContainer.classList.add("finished");
      gameOver();
    }
  }
}

//TODO Swap The indexes of the images and put it in new array
function randomIndexes(arr) {
  let current = arr.length;
  let temp;
  let random;
  while (current > 0) {
    //generate random number
    random = Math.floor(Math.random() * current);
    current--;
    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;
  }
  return arr;
}

let tryAgainButton = document.createElement("button");
let buttonText = document.createTextNode(`try again`);
tryAgainButton.classList.add("try-again-btn");

function gameOver() {
  document.getElementById("lose").play();
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
  document.getElementById("victory").play();
  let popupWin = document.createElement("div");
  let text = document.createTextNode(`Congratulations YOU WIN !!!`);
  tryAgainButton.appendChild(buttonText);
  popupWin.appendChild(text);
  popupWin.classList.add("popup-win");
  popupWin.appendChild(tryAgainButton);
  document.body.appendChild(popupWin);
}
