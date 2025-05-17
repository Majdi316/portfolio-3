//TODO DOM Variables
let lettersContainer = document.querySelector(".letters");
let wordForm = document.querySelector(".game-info .category span");
let lettersGuessContainer = document.querySelector(".letters-guess");
let refreshBtn = document.querySelector("#refresh-btn");
let hint = document.querySelector(".hint");
let theDraw = document.querySelector(".the-draw");
let theStand = document.querySelector(".the-stand");
let theHang = document.querySelector(".the-hang");
let theRope = document.querySelector(".the-rope");
let head = document.querySelector(".head");
let body = document.querySelector(".body");
let hands = document.querySelector(".hands");
let legs = document.querySelector(".legs");
let hintText = document.querySelector(".hint-text");
let hintImg = document.querySelector("#hint-img");
let outOfHintImage = "./images/klipartz.com.png";

//TODO Variables
const letters = "abcdefghijklmnopqrstuvwxyz+#";
//convert the string into array
let lettersArray = letters.split("");
//create an object of words and categories
const words = {
  programming: [
    "php",
    "javascript",
    "java",
    "c++",
    "c#",
    "react",
    "mysql",
    "python",
  ],
  animals: [
    "Giraffe",
    "Bison",
    "Black Swallowtail",
    "Cat",
    "Carolina Dog",
    "Duck",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  cities: ["Afula", "Arad", "Ashdod", "Bat Yam", "Dimona", "Haifa"],
};
//get random key
let allKeys = Object.keys(words); //return array of keys in the object
// console.log(allKeys);
let randomPropertyNumber = Math.floor(Math.random() * allKeys.length);
let randomPropertyName = allKeys[randomPropertyNumber];
let randomPropertyValue = words[randomPropertyName];
let randomValueNumber = Math.floor(Math.random() * randomPropertyValue.length);
//the chosen random word
let randomValue = randomPropertyValue[randomValueNumber].toLowerCase();
let letterAndSpace = randomValue.split("");
let lengthOfWord = letterAndSpace.length;
let numberOfHint = 0;
let letterSuccess = 0;
let indexesArray = [];
let randomIndex = Math.floor(Math.random() * letterAndSpace.length);

//generate number of hints
if (lengthOfWord <= 5) {
  numberOfHint = 1;
} else if (lengthOfWord > 5 && lengthOfWord <= 8) {
  numberOfHint = 2;
} else if (lengthOfWord > 8) {
  numberOfHint = 3;
}
hintText.innerHTML = numberOfHint;
//TODO Global

//TODO Create the list of letters
lettersArray.forEach((letter) => {
  //create span element
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  //append text into span
  span.appendChild(theLetter);
  //add class on the span
  span.classList.add("letter-box");
  //append the span to the container
  lettersContainer.appendChild(span);
});

wordForm.innerHTML = randomPropertyName;

//create spans depends on chosen word
letterAndSpace.forEach((letter, index) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.classList.add("white-space");
    letterSuccess++;
    indexesArray.push(index);
  }
  lettersGuessContainer.appendChild(emptySpan);
});

//handle clicking on letters
let arrSpan = document.querySelectorAll(".letters-guess span");
let wrongLetter = 0;

let draw = document.querySelector(".hangman-draw");
//start addEventListener

document.addEventListener("click", (event) => {
  //event.target is return the element
  //start if 1
  let letterStatus = false;

  if (event.target.className === "letter-box") {
    event.target.classList.add("clicked");
    let clickedLetter = event.target.textContent.toLowerCase();
    //todo start forEach
    letterAndSpace.forEach((letter, index) => {
      //start if 2
      if (clickedLetter == letter) {
        indexesArray.push(index);
        letterSuccess++;
        letterStatus = true;
        //start forEach
        arrSpan.forEach((span, spanIndex) => {
          if (index === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
        //end for each
      } //end if 2
    });
    //todo end forEach
    if (letterStatus !== true) {
      wrongLetter++;
      // draw.classList.add(`wrong-${wrongLetter}`);
      switch (wrongLetter) {
        case 1:
          theDraw.style.display = "block";
          break;
        case 2:
          theStand.style.display = "block";
          break;
        case 3:
          theHang.style.display = "block";
          break;
        case 4:
          theRope.style.display = "block";
          break;
        case 5:
          head.style.display = "block";
          break;
        case 6:
          body.style.display = "block";
          break;
        case 7:
          hands.style.display = "block";
          break;
        case 8:
          legs.style.display = "block";
          break;
        default:
      }

      if (wrongLetter === 8) {
        document.getElementById("fail").play();

        lettersContainer.classList.add("finished");
        endGame();
      }
    }
    if (letterSuccess == letterAndSpace.length) {
      document.getElementById("success").play();
      lettersContainer.classList.add("finished");
      winGame();
    }
  }
  //end if 1
});
//end addEventListener

let tryAgainButton = document.createElement("button");
let buttonText = document.createTextNode(`try again`);
tryAgainButton.classList.add("try-again-btn");

function endGame() {
  let popup = document.createElement("div");
  let text = document.createTextNode(`Game over, The word is ${randomValue}`);
  tryAgainButton.appendChild(buttonText);
  popup.appendChild(text);
  popup.classList.add("popup");
  popup.appendChild(tryAgainButton);
  document.body.appendChild(popup);
}

tryAgainButton.addEventListener("click", () => {
  location.reload();
});

refreshBtn.addEventListener("click", () => {
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

function generateRandomIndex() {
  randomIndex = Math.floor(Math.random() * letterAndSpace.length);
}


let lettersBox = document.querySelectorAll(".letter-box");
hint.addEventListener("click", () => {
  if (numberOfHint > 0) {
    let u = indexesArray.includes(randomIndex);
    while (u == true) {
      generateRandomIndex();
      u = indexesArray.includes(randomIndex);
    }
    if (u == false) {
      let randomLetter = letterAndSpace[randomIndex];
      letterAndSpace.forEach((letter, letterIndex) => {
        if (randomLetter == letter) {
          lettersBox.forEach((box, boxIndex) => {
            if (box.innerHTML == randomLetter) {
              box.classList.add("clicked");
            }
          });
          letterSuccess++;
          indexesArray.push(letterIndex);
          arrSpan[letterIndex].innerHTML = letter;
        }
      });

      generateRandomIndex();
    }
    if (letterSuccess == letterAndSpace.length) {
      document.getElementById("success").play();
      lettersContainer.classList.add("finished");
      winGame();
    }
    console.log(indexesArray);
    console.log(`the random is ${randomIndex}`);
  }
  numberOfHint--;
  hintText.innerHTML = numberOfHint;
  if (numberOfHint == 0) {
    hint.classList.add("closeHint");
    hintImg.src = outOfHintImage;
  }
});
