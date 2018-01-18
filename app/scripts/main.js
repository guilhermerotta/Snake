window.onload = () => {
  const boardDiv = document.getElementById('snake-board');
  const board = new SnakeBoard(boardDiv);
  board.initGame({
    snakeSize: 5,
    speed: 100
  });
};