"use strict";

// var gameContainer = document.getElementById("main-game-div");

/***** INDIVIDUAL GAME CARD *****/
var gameCard = (function() {
  var filled = false,
    filledMark = null,
    counter = 0,
    currentPlayer = 1,
    gameContainer = document.getElementById("main-game-div"),
    p1Cards = [],
    p2Cards = [],
    winningCombos = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];

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
      p1Cards.push(cardId);
      sortCards(p1Cards);
    } else {
      p2Cards.push(cardId);
      sortCards(p2Cards);
    }
    checkForWin();
  }

  function sortCards(cardArray) {
    cardArray.sort(function(a, b) {
      return a - b;
    });
  }

  function checkForWin() {
    if (currentPlayer === 1) {

      console.log(p1Cards);

    } else {

      console.log(p2Cards);

    }

  }

  return {
    startGame: startGame
  }

})();

gameCard.startGame();
