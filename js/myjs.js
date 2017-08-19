"use strict";

// var gameContainer = document.getElementById("main-game-div");

/***** INDIVIDUAL GAME CARD *****/
var gameCard = (function() {
  var filled = false,
    filledMark = null,
    counter = 0,
    currentPlayer = 1,
    gameContainer = document.getElementById("main-game-div");

  function startGame() {
    console.log("Game started by card!");
    checkForClick();
  }

  function checkForClick() {
    gameContainer.addEventListener("click", isCardFilled);
  }

  function isCardFilled() {
    var cardClicked = event.target;
    var cardAleadyFilled = cardClicked.classList.contains("filled");
    var cardId = cardClicked.id;

    if (cardAleadyFilled) {
      console.log("This card has already been filled!");
      return true;

      // If card is NOT yet filled...
    } else {
      addClickedCardStyles(cardClicked);
      increaseCounter();
      markCard(cardClicked, cardId);
      return false;
    }
  }

  // Changes background to light gray/white only.
  function addClickedCardStyles(cardClicked) {
    cardClicked.classList.add("filled");
  }

  function increaseCounter() {
    counter++;
    console.log("Counter: " + counter);
    choosePlayer();
  };

  function choosePlayer() {
    currentPlayer = counter % 2 != 0 ? 1 : 2;
    console.log("Current player: " + currentPlayer);
  };

  function markCard(cardClicked, cardId) {
    if (currentPlayer === 1) {
      cardClicked.innerHTML = "X";
    } else {
      cardClicked.innerHTML = "O";
    }
    storeCard(cardId);
  }

  function storeCard(cardId) {
    if (currentPlayer === 1) {
      gameController.player1Cards.push(cardId);
      console.table("Player 1's cards: ");
      console.log(gameController.player1Cards);
    } else {
      gameController.player2Cards.push(cardId);
      console.log("Player 2's cards: ");
      console.log(gameController.player2Cards);
    }
    checkForWin();
  }

  function checkForWin() {

  }

  return {
    startGame: startGame
  }

})();

var gameController = (function() {
  var player1Cards = [],
    player2Cards = [];

  return {
    player1Cards: player1Cards,
    player2Cards: player2Cards
  };

})();

gameCard.startGame();
