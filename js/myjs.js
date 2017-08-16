"use strict";

var gameContainer = document.getElementById("main-game-div");

/***** GAME CONTROLLER *****/
var gameController = (function() {
  var counter = 0,
    currentPlayer = undefined;

  function startGame() {
    console.log("started");
    checkForClick();
  }

  function checkForClick() {
    gameContainer.addEventListener("click", playGame);
  }

  function playGame() {
    console.log("Playing");
    increaseCounter();
    choosePlayer();
  }

  function increaseCounter() {
    counter++;
    console.log("Counter: " + counter);
  };

  function choosePlayer() {
    currentPlayer = counter % 2 !=0 ? 1 : 2;
    console.log("Current Player:" + currentPlayer);
  };

  return {
    counter: counter,
    gameContainer: gameContainer,
    startGame: startGame
  };

})();

/***** INDIVIDUAL GAME CARD *****/
var gameCard = {
  filled: false,
  filledMark: null,
  markCard: function() {
    if (!this.filled) {
      if (gameController.currentPlayer == 1) {
        console.log(gameController.currentPlayer);
      } else {
        console.log(gameController.currentPlayer);
      }
    }
    console.log("This card has already been marked!");
  }
}

gameController.startGame();
