// General-purpose actions in the game.

Game.do = (function() {
  /**
   * A function for adding a disc to our Connect Four board state.
   *
   * @param number x_pos The x-position of the location chosen.
   * @param number y_pos The y-position of the location chosen.
   */
  function addDiscToBoard(x_pos, y_pos) {
    Game.board[y_pos][x_pos] = Game.currentPlayer;
  }

  /**
   * Print the contents of our Game.board state to the html page.
   */
  function printBoard() {
    var row, cell;
    for (var y = 0; y <= Game.config.boardHeight; y++) {
      for (var x = 0; x <= Game.config.boardLength; x++) {
        if (Game.check.isPositionTaken(x, y)) {
          row = document.querySelector('tr:nth-child(' + (1 + y) + ')');
          cell = row.querySelector('td:nth-child(' + (1 + x) + ')');
          cell.firstElementChild.classList.add(Game.board[y][x]);
        }
      }
    }
  }

  /**
   * A function for changing players both in state and on the screen.
   */
  function changePlayer() {
    var currentPlayerNameEl = document.querySelector('#current-player');
    var otherPlayerNameEl = document.querySelector('#other-player');

    // Switch players
    var otherPlayer = Game.currentPlayer
    var otherPlayerName = currentPlayerNameEl.textContent;
    var currentPlayerName = otherPlayerNameEl.textContent;
    Game.currentPlayer = (Game.currentPlayer === 'black') ? 'red' : 'black';


    // Update the players in the UI.
    currentPlayerNameEl.classList.remove(otherPlayer);
    currentPlayerNameEl.classList.add(Game.currentPlayer);
    currentPlayerNameEl.textContent = currentPlayerName;

    otherPlayerNameEl.classList.remove(Game.currentPlayer);
    otherPlayerNameEl.classList.add(otherPlayer);
    otherPlayerNameEl.textContent = otherPlayerName;

  }

  /**
   * If there are empty positions below the one chosen, return the new y-position
   * we should drop the piece to.
   *
   * @param number x_pos The x-position of the location chosen.
   * @param number y_pos The y-position of the location chosen.
   * @return number - The y-position the disc should fall into.
   */
  function dropToBottom(x_pos, y_pos) {
    // Start at the bottom of the column, and step up, checking to make sure
    // each position has been filled. If one hasn't, return the empty position.
    for (var y = Game.config.boardHeight; y > y_pos; y--) {
      if (!Game.check.isPositionTaken(x_pos, y)) {
        return y;
      }
    }
    return y_pos;
  }

  /**
   * Handle edge-cases in name changes
   * @param event
   */
  function handleNameChange(event) {
    // Prevent the default "newline" behavior when hitting "Enter"
    if (event.keyCode === 13) {
      event.preventDefault();
      document.body.focus();
    }
  }

  return {
    addDiscToBoard,
    printBoard,
    changePlayer,
    dropToBottom,
    handleNameChange
  };
})();



// General-purpose status checks for the game.

Game.check = (function() {
  /**
   * Test to ensure the chosen location isn't taken.
   *
   * @param number x_pos The x-position of the location chosen.
   * @param number y_pos The y-position of the location chosen.
   * @return bool returns true or false for the question "Is this spot taken?".
   */
  function isPositionTaken(x_pos, y_pos) {
    return Game.board[y_pos][x_pos] !== 0;
  }

  /**
   * Determine if the game is a draw (all peices on the board are filled).
   *
   * @return bool Returns true or false for the question "Is this a draw?".
   */
  function isGameADraw() {
    for (var y = 0; y <= Game.config.boardHeight; y++) {
      for (var x = 0; x <= Game.config.boardLength; x++) {
        if (!isPositionTaken(x, y)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Test to see if somebody got four consecutive horizontal pieces.
   *
   * @return bool Returns true if a win was found, and otherwise false.
   */
  function isHorizontalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;

    // Scan each row in series, tallying the length of each series. If a series
    // ever reaches four, return true for a win.
    for (var y = 0; y <= Game.config.boardHeight; y++) {
      for (var x = 0; x <= Game.config.boardLength; x++) {
        currentValue = Game.board[y][x];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
      }

      // After each row, reset the tally and previous value.
      tally = 0;
      previousValue = 0;
    }

    // No horizontal win was found.
    return false;
  }

  /**
   * Test to see if somebody got four consecutive vertical pieces.
   *
   * @return bool Returns true if a win was found, and otherwise false.
   */
  function isVerticalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;

    // Scan each column in series, tallying the length of each series. If a
    // series ever reaches four, return true for a win.
    for (var x = 0; x <= Game.config.boardLength; x++) {
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        currentValue = Game.board[y][x];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
      }

      // After each column, reset the tally and previous value.
      tally = 0;
      previousValue = 0;
    }

    // No vertical win was found.
    return false;
  }

  /**
   * Test to see if somebody got four consecutive diagonel pieces.
   *
   * @return bool Returns true if a win was found, and otherwise false.
   */
  function isDiagonalWin() {
    var x = null,
        y = null,
        xtemp = null,
        ytemp = null,
        currentValue = null,
        previousValue = 0,
        tally = 0;

    // Test for down-right diagonals across the top.
    for (x = 0; x <= Game.config.boardLength; x++) {
      xtemp = x;
      ytemp = 0;

      while (xtemp <= Game.config.boardLength && ytemp <= Game.config.boardHeight) {
        currentValue = Game.board[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;

        // Shift down-right one diagonal index.
        xtemp++;
        ytemp++;
      }
      // Reset the tally and previous value when changing diagonals.
      tally = 0;
      previousValue = 0;
    }

    // Test for down-left diagonals across the top.
    for (x = 0; x <= Game.config.boardLength; x++) {
      xtemp = x;
      ytemp = 0;

      while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
        currentValue = Game.board[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;

        // Shift down-left one diagonal index.
        xtemp--;
        ytemp++;
      }
      // Reset the tally and previous value when changing diagonals.
      tally = 0;
      previousValue = 0;
    }

    // Test for down-right diagonals down the left side.
    for (y = 0; y <= Game.config.boardHeight; y++) {
      xtemp = 0;
      ytemp = y;

      while (xtemp <= Game.config.boardLength && ytemp <= Game.config.boardHeight) {
        currentValue = Game.board[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;

        // Shift down-right one diagonal index.
        xtemp++;
        ytemp++;
      }
      // Reset the tally and previous value when changing diagonals.
      tally = 0;
      previousValue = 0;
    }

    // Test for down-left diagonals down the right side.
    for (y = 0; y <= Game.config.boardHeight; y++) {
      xtemp = Game.config.boardLength;
      ytemp = y;

      while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
        currentValue = Game.board[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;

        // Shift down-left one diagonal index.
        xtemp--;
        ytemp++;
      }
      // Reset the tally and previous value when changing diagonals.
      tally = 0;
      previousValue = 0;
    }

    // No diagonal wins found. Return false.
    return false;
  }

 return {
   isPositionTaken,
   isGameADraw,
   isHorizontalWin,
   isVerticalWin,
   isDiagonalWin
 }

})();
