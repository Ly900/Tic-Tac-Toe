"use strict";

var gameContainer = document.getElementById("main-game-div");

/***** INDIVIDUAL GAME CARD *****/
var gameCard = (function() {
  var filled = false,
    filledMark = null,
    counter = 0,
    currentPlayer = undefined;

  function startGame() {
    console.log("Game started by card!");
    checkForClick();
  }

  function checkForClick() {
    gameContainer.addEventListener("click", isCardFilled);
  }

  function isCardFilled() {
    var cardClicked = event.target,
    cardAleadyFilled = cardClicked.classList.contains("filled");

    if (cardAleadyFilled) {
      console.log("This card has already been filled!");
    } else {
      markCard(cardClicked);
    }
  }

  function markCard(cardClicked) {
    cardClicked.classList.add("filled");
    if (choosePlayer() === 1) {
      cardClicked.innerHTML = "O";
    } else {
      cardClicked.innerHTML = "X";
    }
    checkForWin();
    increaseCounter();
    choosePlayer();
  }

  function increaseCounter() {
    counter++;
    console.log("Counter: " + counter);
  };

  function choosePlayer() {
    currentPlayer = counter % 2 != 0 ? 1 : 2;
    console.log("Current Player:" + currentPlayer);
    return currentPlayer;
  };

  function checkForWin() {
    
  }

  return {
    startGame: startGame
  }

})();

gameCard.startGame();
