"use strict";

var gameContainer = document.getElementById("main-game-div");

/***** INDIVIDUAL GAME CARD *****/
var gameCard = (function() {
  var filled = false,
    filledMark = null,
    counter = 0,
    currentPlayer = 1;

  function startGame() {
    console.log("Game started by card!");
    checkForClick();
  }

  function checkForClick() {
    gameContainer.addEventListener("click", isCardFilled);
  }

  function isCardFilled() {
    var cardClicked = event.target,
      cardAleadyFilled = cardClicked.classList.contains("filled"),
      // The span below contains the id of the card to use in the player's array to check for win.
      boxWithId = cardClicked.children[0],
      cardId = boxWithId.id;
    console.log("Card id: " + cardId);

    if (cardAleadyFilled) {
      console.log("This card has already been filled!");

      // If card is NOT yet filled...
    } else {
      addClickedCardStyles(cardClicked);
      increaseCounter();
      markCard(cardClicked, boxWithId);
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

  function markCard(cardClicked, boxWithId) {
    if (currentPlayer === 1) {
      boxWithId.innerHTML = "X";
    } else {
      boxWithId.innerHTML = "O";
    }
    storeCard(boxWithId);
  }

  function storeCard(boxWithId) {
    if (currentPlayer === 1) {
      gameController.player1Cards.push(boxWithId.id);
      console.log("Player 1's cards: ");
      console.log(gameController.player1Cards);
    } else {
      gameController.player2Cards.push(boxWithId.id);
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
