var gameCard = (function() {
  "use strict";
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
    ],
    gameSquares = document.querySelectorAll("div.square");

  function startGame() {
    checkForClick();
    addHoverEventsDuringGame();
  }

  // Add click event to entire board.
  function checkForClick() {
    gameContainer.addEventListener("click", isCardFilled);
  }

  function addHoverEventsDuringGame() {
    for (var i = 0; i < gameSquares.length; i++) {
      gameSquares[i] = this;
      gameSquares[i].addEventListener("mouseover", function() {
        this.classList.add("hover");
      }, false);
      gameSquares[i].addEventListener("mouseout", function() {
        this.classList.remove("hover");
      }, false);
    }
  }

  function addHoverStyles() {
    console.log("Moused over");
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
      getSingleWinningCombo();
    }
  }

  function sortCards(cardArray) {
    cardArray.sort(function(a, b) {
      return a - b;
    });
  }

  function getSingleWinningCombo() {
    var singleWinningCombo = [];
    for (var i = 0; i < winningCombos.length; i++) {
      singleWinningCombo = winningCombos[i];
      var hasWin = compareArrays(singleWinningCombo);
      if (hasWin) break;
    }
  }

  function compareArrays(singleWinningCombo) {
    var foundWin = false,
      numMatches = 0;

    var playerCards = currentPlayer === 1 ? p1Cards : p2Cards;

    for (var i = 0; i < singleWinningCombo.length; i++) {
      for (var j = 0; j < playerCards.length; j++) {
        if (singleWinningCombo[i] === playerCards[j]) {
          numMatches++;
          if (numMatches === 3) {
            foundWin = true;
            declareWinner(singleWinningCombo);
            foundWin = true;
          }
        }
      }
    }
    return foundWin;
  }

  function declareWinner(singleWinningCombo) {
    console.log("Winning cards: " + singleWinningCombo);
    console.log("Player " + currentPlayer + " wins!");
    gameEndEvents(singleWinningCombo);
  }

  function gameEndEvents(singleWinningCombo) {
    gameContainer.removeEventListener("click", isCardFilled);

    addHoverEventGameEnded();
    flickerWinningBoxes(singleWinningCombo);
    setTimeout(function() {
      alert("Player " + currentPlayer + " wins!")
    }, 500);
  }

  function addHoverEventGameEnded() {
    for (var i = 0; i < gameSquares.length; i++) {
      gameSquares[i] = this;
      gameSquares[i].addEventListener("mouseover", function() {
        this.classList.remove("hover");
      }, false);
    }
  }

  function flickerWinningBoxes(singleWinningCombo) {
    var winningCards = singleWinningCombo;

    for (var i = 0; i < winningCards.length; i++) {

      var winningCard = document.getElementById(winningCards[i]);

      winningCard.classList.remove("filled");

      if (currentPlayer === 1) {
        winningCard.classList.add("x-win-card");
      } else {
        winningCard.classList.add("o-win-card");
      }

    }

  }

  return {
    startGame: startGame
  }

})();

gameCard.startGame();
