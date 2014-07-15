$( document ).ready(function() {

    // Trigger the game loop by clicking on a position button on the board.
    $('.board button').click(function(e) {

        // Detect which button was clicked.
        y_pos = $('.board tr').index($(this).closest('tr'));
        x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));

        console.log('x position is: ' + x_pos);
        console.log('y position is: ' + y_pos);

        // Run tests to see if the move is illegal, or if it resulted in a win.
        var isTaken, isAtBottom;

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
            alert("The winner is: "+ currentPlayer);

            // Destroy our click listener to prevent further play.
            $('.board button').unbind('click');
            $('h2').replaceWith('<h2 class="winner">The winner is: ' + currentPlayer + '! <a href="#" onClick="location.reload();">Play Again</a>.</h2>');
        }

        changePlayer();

    });
});