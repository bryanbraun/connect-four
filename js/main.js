document.querySelector('#lets-play-btn')
        .addEventListener('click', function() {
          Game.do.changeScene();
          Game.main();
        });

// Setup the main game logic.
Game.main = function() {
  Game.config.blackPlayerName = document.querySelector('#name-black').value;
  Game.config.redPlayerName = document.querySelector('#name-red').value

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
    y_pos = Game.do.dropToBottom(x_pos, y_pos);

    if (Game.check.isPositionTaken(x_pos, y_pos)) {
      alert(Game.config.takenMsg);
      return;
    }

    // Add the piece to the board.
    Game.do.addDiscToBoard(x_pos, y_pos);
    Game.do.printBoard();

    // Check to see if we have a winner.
    if (Game.check.isVerticalWin() || Game.check.isHorizontalWin() || Game.check.isDiagonalWin()) {
      gameBoardEl.removeEventListener('click', placeGamePiece);
      prefixEl.textContent = Game.config.winPrefix;
      playAgainEl.classList.add('show');
      return;
    } else if (Game.check.isGameADraw()) {
      gameBoardEl.removeEventListener('click', placeGamePiece);
      topTextEl.textContent = Game.config.drawMsg;
      playAgainEl.classList.add('show');
      return;
    }

    // Change player.
    Game.do.changePlayer();
  };

};
