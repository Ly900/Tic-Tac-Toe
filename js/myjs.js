"use strict";

var counter = 0,
  gameContainer = document.getElementsByClassName("main-game-div")[0];

//Each click adds to counter
gameContainer.addEventListener("click", markSquare);

function increaseCounter() {
  counter++;
}

function markSquare(e) {
  if (counter % 2 != 0) {
    console.log("Player 1");
    e.target.innerHTML = "X";
  } else {
    console.log("Player 2");
    e.target.innerHTML = "O";
  }

  increaseCounter();
}

//If odd click, it's Player 1
//Display an X.

//If even click, it's Player 2
//Display an O.
