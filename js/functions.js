
/**
 * A function for adding a disc to our Connect Four board.
 *
 * @param string color The color of the current player.
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 */
function addDiscToBoard(color, x_pos, y_pos) {
    board[y_pos][x_pos] = color;
}


function printBoard() {
    // Start by just printing it in console.log.
    console.log(board);

    // Loop through the board, and add classes to each cell for the
    // appropriate colors.
    var column, row;
    for (y = 0; y <= 5; y++) {
        for (x = 0; x <= 6; x++) {
            if (board[y][x] !== 0) {
                // row = $("tr:eq(" + y + ")");
                cell = $("tr:eq(" + y + ")").find('td').eq(x);
                cell.children('button').css("background-color", board[y][x]);
            }
        }
    }
}

/**
 * A function for changing players at the end of a turn.
 */
function changePlayer() {
    // Change the value of our player variable.
    if (currentPlayer === 'black') {
        currentPlayer = 'red';
    } else {
        currentPlayer = 'black';
    }

    // Update the UI.
    $('.player').text(currentPlayer);
}

/**
 * Test to ensure the chosen location is at the bottom of the column.
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 * @return bool returns true or false for the question "Is this at the bottom?".
 */
function bottomTest(x_pos, y_pos) {
    var isAtBottom,
        fail;

    // Start at the bottom of the column, and step up, checking to make sure
    // each position has been filled. Go until you reach the chosen position.
    for (y = 5; y > y_pos; y--) {
        if (board[y][x_pos] === 0) {
            fail = true;
        }
    }
    if (fail === true) {
        isAtBottom = false;
    } else {
        isAtBottom = true;
    }
    return isAtBottom;
}


/**
 * Test to ensure the chosen location isn't taken.
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 * @return bool returns true or false for the question "Is this spot taken?".
 */
function takenTest(x_pos, y_pos) {
    var isTaken,
        value = board[y_pos][x_pos];

    if (value === 0) {
        isTaken = false;
    } else {
        isTaken = true;
    }

    return isTaken;
}

/**
 * Test to see if somebody got four consecutive horizontal pieces.
 * @return bool returns true or false
 */
function horizontalWin() {
    var currentValue,
        previousValue = 'none',
        tally = 0;

    // Scan each row in series, tallying the length of each series. If a series
    // ever reaches four, return true for a win.
    for (y = 0; y <= 5; y++) {
        for (x = 0; x <= 6; x++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each row, reset the tally.
        tally = 0;
    }

    // No horizontal win was found.
    return false;
}

/**
 * Test to see if somebody got four consecutive horizontal pieces.
 * @return bool returns true or false
 */
function verticalWin() {
    var currentValue,
        previousValue = 'none',
        tally = 0;

    // Scan each column in series, tallying the length of each series. If a
    // series ever reaches four, return true for a win.
    for (x = 0; x <= 6; x++) {
        for (y = 0; y <= 5; y++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each column, reset the tally.
        tally = 0;
    }

    // No vertical win was found.
    return false;
}

/**
 * Test to see if somebody got four consecutive horizontal pieces.
 * @todo: refactor this to make it more DRY.
 * @return bool returns true or false
 */
function diagonalWin() {
    var xtemp,
        ytemp,
        currentValue,
        previousValue = 'none',
        tally = 0;

    // Test for down-right diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;

        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;

            // Shift down one diagonal index
            xtemp++;
            ytemp++;
        }
        tally = 0;
    }

    // test for down-left diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;

        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;

            // Shift down one diagonal index
            xtemp--;
            ytemp++;
        }
        tally = 0;
    }

    // Test for down-right diagonals down the left side.
    for (y = 0; y <= 5; y++) {
        xtemp = 0;
        ytemp = y;

        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;

            // Shift down one diagonal index
            xtemp++;
            ytemp++;
        }
        tally = 0;
    }

    // test for down-left diagonals down the right side.
    for (y = 0; y <= 5; y++) {
        xtemp = 6;
        ytemp = y;

        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;

            // Shift down one diagonal index
            xtemp--;
            ytemp++;
        }
        tally = 0;
    }

    // No diagonal wins found. Return false.
    return false;
}
