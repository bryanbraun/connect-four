(function () {
  // Setup game.
  // @todo: Make name pop-ups more user-friendly. Perhaps optional?
  config.blackPlayerName = prompt("Please enter the first player's name. This player will use black game pieces.", config.blackPlayerName) || config.blackPlayerName;
  config.redPlayerName = prompt("Please enter the second player's name. This player will use red game pieces.", config.redPlayerName) || config.redPlayerName;

  var topTextEl = document.querySelector('#top-text');
  var prefixEl = document.querySelector('#prefix');
  var playerNameEl = document.querySelector('#player-name');
  var playAgainEl = document.querySelector('#play-again');
  var playAgainBtnEl = document.querySelector('#play-again-btn');
  var gameBoardEl = document.querySelector('#board');

  prefixEl.textContent = config.playerPrefix;
  playerNameEl.textContent = config[currentPlayer + "PlayerName"];
  playerNameEl.classList.add(currentPlayer);

  playAgainBtnEl.addEventListener('click', () => location.reload());
  gameBoardEl.addEventListener('click', placeGamePiece);

  function placeGamePiece(e) {
    if (e.target.tagName !== 'BUTTON') return;

    var targetCell = e.target.parentElement;
    var targetRow = targetCell.parentElement;
    var targetRowCells = [...targetRow.children];
    var gameBoardRowsEls = [...document.querySelectorAll('#board tr')];

    // Detect the x and y position of the button clicked.
    var y_pos = gameBoardRowsEls.indexOf(targetRow);
    var x_pos = targetRowCells.indexOf(targetCell);

    // Ensure the piece falls to the bottom of the column.
    y_pos = dropToBottom(x_pos, y_pos);

    if (positionIsTaken(x_pos, y_pos)) {
      alert(config.takenMsg);
      return;
    }

    addDiscToBoard(currentPlayer, x_pos, y_pos);
    printBoard();

    // Check to see if we have a winner.
    if (verticalWin() || horizontalWin() || diagonalWin()) {
      // Destroy our click listener to prevent further play.
      gameBoardEl.removeEventListener('click', placeGamePiece);
      prefixEl.textContent = config.winPrefix;
      playAgainEl.classList.add('show');
      return;
    } else if (gameIsDraw()) {
      // Destroy our click listener to prevent further play.
      gameBoardEl.removeEventListener('click', placeGamePiece);
      topTextEl.textContent = config.drawMsg;
      playAgainEl.classList.add('show');
      return;
    }

    changePlayer();
  };


})();
