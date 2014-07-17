$( document ).ready(function() {

    playerName.black = prompt("Please enter the first player's name. This player will use black game pieces.", "Player 1") || 'Player 1';
    playerName.red = prompt("Please enter the second player's name. This player will use red game pieces.", "Player 2") || 'Player 2';
    $('.message').html('Current Player is: <span class="player">' + playerName[currentPlayer] + '</span>.');

    // Trigger the game loop by clicking on a position button on the board.
    $('.board button').click(function(e) {
        var y_pos,
            x_pos,
            isTaken,
            isAtBottom;

        // Detect the x and y position of the button clicked.
        y_pos = $('.board tr').index($(this).closest('tr'));
        x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));

        // Run tests to see if the move is illegal, or if it resulted in a win.
        isTaken = takenTest(x_pos, y_pos);
        if (isTaken === true) {
            alert("This position is already taken. Please make another choice.");
            return;
        }
        isAtBottom = bottomTest(x_pos, y_pos);
        if (isAtBottom === false) {
            alert("Please choose a location at the bottom of the column.");
            return;
        }

        addDiscToBoard(currentPlayer, x_pos, y_pos);
        printBoard();

        // Check to see if we have a winner.
        if (verticalWin() || horizontalWin() || diagonalWin()) {
            alert("The winner is: "+ playerName[currentPlayer]);

            // Destroy our click listener to prevent further play.
            $('.board button').unbind('click');
            $('.message').html('The winner is: <span class="' + currentPlayer + '">' + playerName[currentPlayer] + '</span>! <a href="#" onClick="location.reload();">Play Again</a>.');

        } else if(gameIsDraw()) {
            alert("This game is a draw.");

            // Destroy our click listener to prevent further play.
            $('.board button').unbind('click');
            $('.message').html('This game is a draw. <a href="#" onClick="location.reload();">Play Again</a>.');
        }

        changePlayer();

    });
});