// Setup the main game logic.

(function () {
  // @todo: Make name pop-ups more user-friendly. Perhaps optional?
  Game.config.blackPlayerName = prompt("Please enter the first player's name. This player will use black game pieces.", Game.config.blackPlayerName) || Game.config.blackPlayerName;
  Game.config.redPlayerName = prompt("Please enter the second player's name. This player will use red game pieces.", Game.config.redPlayerName) || Game.config.redPlayerName;

  var topTextEl = document.querySelector('#top-text');
  var prefixEl = document.querySelector('#prefix');
  var playerNameEl = document.querySelector('#player-name');
  var playAgainEl = document.querySelector('#play-again');
  var playAgainBtnEl = document.querySelector('#play-again-btn');
  var gameBoardEl = document.querySelector('#board');

  prefixEl.textContent = Game.config.playerPrefix;
  playerNameEl.textContent = Game.config[Game.currentPlayer + "PlayerName"];
  playerNameEl.classList.add(Game.currentPlayer);

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
    y_pos = Game.actions.dropToBottom(x_pos, y_pos);

    if (Game.actions.positionIsTaken(x_pos, y_pos)) {
      alert(Game.config.takenMsg);
      return;
    }

    // Add the piece to the board.
    Game.actions.addDiscToBoard(x_pos, y_pos);
    Game.actions.printBoard();

    // Check to see if we have a winner.
    if (Game.actions.verticalWin() || Game.actions.horizontalWin() || Game.actions.diagonalWin()) {
      gameBoardEl.removeEventListener('click', placeGamePiece);
      prefixEl.textContent = Game.config.winPrefix;
      playAgainEl.classList.add('show');
      return;
    } else if (Game.actions.gameIsDraw()) {
      gameBoardEl.removeEventListener('click', placeGamePiece);
      topTextEl.textContent = Game.config.drawMsg;
      playAgainEl.classList.add('show');
      return;
    }

    // Change player.
    Game.actions.changePlayer();
  };

})();
