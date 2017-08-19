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
    // console.log("Game started by card!");
    checkForClick();
  }

  // Add click event to entire board.
  function checkForClick() {
    gameContainer.addEventListener("click", isCardFilled);
  }

  /* If card is empty...
  - adds style to card to show it's been played,
  - increases counter that determines which player's turn it is, and
  - marks the card an X or O depending on which player's turn it is.
  */
  function isCardFilled() {
    var cardClicked = event.target;
    var cardAleadyFilled = cardClicked.classList.contains("filled");
    var cardId = Number(cardClicked.id);

    if (cardAleadyFilled) {
      console.log("Please choose another card.");
      // If card is NOT yet filled...
    } else {
      addClickedCardStyles(cardClicked);
      increaseCounter();
      markCard(cardClicked, cardId);
    }
  }

  // Changes background to light gray/white only.
  function addClickedCardStyles(cardClicked) {
    cardClicked.classList.add("filled");
  }

  function increaseCounter() {
    counter++;
    // console.log("Counter: " + counter);
    choosePlayer();
  };

  function choosePlayer() {
    currentPlayer = counter % 2 != 0 ? 1 : 2;
    // console.log("Current player: " + currentPlayer);
  };

  function markCard(cardClicked, cardId) {
    if (currentPlayer === 1) {
      cardClicked.innerHTML = "X";
      storeCard(cardId, p1Cards);
    } else {
      cardClicked.innerHTML = "O";
      storeCard(cardId, p2Cards);
    }
  }

  function storeCard(cardId, currentPlayersCards) {
    currentPlayersCards.push(cardId);
    sortCards(currentPlayersCards);
    if (currentPlayersCards.length >= 3) {
      var lastThree = get3ValuesInArray(currentPlayersCards);
      compareToWinningCombos(lastThree);
    }
  }

  function sortCards(cardArray) {
    cardArray.sort(function(a, b) {
      return a - b;
    });
  }

  function get3ValuesInArray(array) {
    var tempArray = [];
    for (var i = array.length - 3; i < array.length; i++) {
      tempArray.push(array[i]);
    }
    return tempArray;
  }

  function compareToWinningCombos(lastThree) {
    for (var i = 0; i < winningCombos.length; i++) {
      var singleWinningCombo = winningCombos[i];
      var hasWin = compareArrays(lastThree, singleWinningCombo);
      if (hasWin) {
        alert("Player " + currentPlayer + " win!");
        break;
      }
    }
  }

  function compareArrays(lastThree, singleWinningCombo) {

    var foundWin = false;

    // console.log("Last Three: ", lastThree);
    // console.log("Single Winning Combo: ", singleWinningCombo);

    if (
      lastThree[0] === singleWinningCombo[0] &&
      lastThree[1] === singleWinningCombo[1] &&
      lastThree[2] === singleWinningCombo[2]
    ) {
      console.log("They match.");
      foundWin = true;
      return foundWin;
    }
    return foundWin;


  }

  return {
    startGame: startGame
  }

})();

gameCard.startGame();
