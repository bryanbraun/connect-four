// Create global variables for use in our game.
// @todo: Store global settings in a config object. This could include row
//        count, column count, player name defaults, bits of hardcoded text,
//        and # of discs in a row to qualify for a win.

// Define the empty board as a two-dimensional array, full of zeros. In our
// game, 0 represents empty, 'red' represents a red disc, and 'black' represents
// a black disc.
var board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];

// Set starting player to black.
var currentPlayer = 'black';
var playerName = {};
