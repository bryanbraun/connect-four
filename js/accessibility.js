(function () {
  // Manage focus rings on the playing board
  var styleEl = document.querySelector('#a11y-styles');
  document.addEventListener('mousedown', () => styleEl.innerHTML = '');
  document.addEventListener('keydown', () => styleEl.innerHTML = '.board button:focus{border:5px solid #999}');

  // Add arrow-key navigation to the playing board
  document.onkeydown = function(e) {
    e = e || window.event;

    var arrowKeyCodes = [37, 38, 39, 40];
    var isKeypressArrowKey = (arrowKeyCodes.indexOf(e.keyCode) >= 0);
    var isBoardButtonActive = (document.activeElement.tagName == 'BUTTON');
    var isContentEditableActive = (document.activeElement.isContentEditable)

    if (!isKeypressArrowKey || isContentEditableActive) {
      return;
    }

    if (!isBoardButtonActive) {
      // Focus on the first board location (top-left).
      document.querySelector('#board button').focus();
    } else {
      var activeCell = document.activeElement.parentElement;
      var activeRow = activeCell.parentElement;
      var activeRowCells = [...activeRow.children];
      var activeCellIndex = activeRowCells.indexOf(activeCell);

      if (e.keyCode === 38) {
        var rowBefore = activeRow.previousElementSibling;
        if (rowBefore) rowBefore.children[activeCellIndex].firstElementChild.focus();
      }
      else if (e.keyCode === 40) {
        var rowAfter = activeRow.nextElementSibling;
        if (rowAfter) rowAfter.children[activeCellIndex].firstElementChild.focus();
      }
      else if (e.keyCode === 37) {
        var cellBefore = activeCell.previousElementSibling;
        if (cellBefore) cellBefore.firstElementChild.focus();
      }
      else if (e.keyCode === 39) {
        var cellAfter = activeCell.nextElementSibling;
        if (cellAfter) cellAfter.firstElementChild.focus();
      }
    };
  }
})();
