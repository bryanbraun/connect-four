(function () {
  // Manage focus rings on the playing board
  var styleEl = document.querySelector('#a11y-styles');

  document.addEventListener('keydown', () => styleEl.innerHTML = '.board button:focus{border:5px solid #999}');
  document.addEventListener('mousedown', () => styleEl.innerHTML = '');

  // @todo: enable arrow keys for navigating the board
})();
