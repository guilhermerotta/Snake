const CELL_SIZE = 20;
const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 600;

const LEFT = 'left';
const UP = 'up';
const RIGHT = 'right';
const DOWN = 'down';

const KEYS = {
  37: LEFT,
  38: UP,
  39: RIGHT,
  40: DOWN
};

class SnakeBoard {
  constructor(boardElement) {
    this.direction = RIGHT;
    this.boardElement = boardElement;
    this.registerEventListeners();
  }

  registerEventListeners() {
    document.addEventListener('keydown', (evt) => {
      const newDirection = KEYS[evt.which];
      if (newDirection) {
        this.direction = newDirection;
      }
    });
  }

  hasCollision(headPos) {
    return headPos.x < 0 || headPos.x >= (BOARD_WIDTH / CELL_SIZE) ||
      headPos.y < 0 || headPos.y >= (BOARD_HEIGHT / CELL_SIZE);
  }

  foodFound(headPos) {
    return this.foodCell.position.x === headPos.x &&
      this.foodCell.position.y === headPos.y;
  }

  moveSnake(snake) {
    let headPos = snake.getHead().getPosition();

    if (this.hasCollision(headPos)) {
      clearInterval(this.interval);
    } else if (this.foodFound(headPos)) {
      snake.grow();
      this.renderFood();
    }

    switch (this.direction) {
      case LEFT:
        headPos.x--;
        break;
      case UP:
        headPos.y--;
        break;
      case RIGHT:
        headPos.x++;
        break;
      case DOWN:
        headPos.y++;
        break;
    }
    snake.move(headPos);
  }

  /**
   * Renders on the screen the cells that make the snake, based on their x and y coordinates
   * @param snake a Snake instance
   */
  renderSnake(snake) {
    let bodyCell = snake.getHead();
    while (bodyCell) {
      let pos = bodyCell.getPosition();
      // Avoids creating a new DOM element every time
      if (!bodyCell.getElement()) {
        bodyCell.setElement(this.addElementToBoard('div', 'snake-cell'));
      }
      bodyCell.getElement().setAttribute('style', `left:${pos.x * CELL_SIZE}px; top: ${pos.y * CELL_SIZE}px`);
      bodyCell = bodyCell.getNextCell();
    }
  }

  renderFood() {
    const pos = {
      x: Math.floor(Math.random() * (BOARD_WIDTH / CELL_SIZE)),
      y: Math.floor(Math.random() * (BOARD_HEIGHT / CELL_SIZE))
    };

    // Avoids creating a new DOM element every time
    this.foodCell = this.foodCell || Object.assign({}, { element: this.addElementToBoard('div', 'food') });
    this.foodCell.element.setAttribute('style', `left:${pos.x * CELL_SIZE}px; top: ${pos.y * CELL_SIZE}px`);
    this.foodCell.position = pos;
  }

  addElementToBoard(tag = 'div', className) {
    let newElement = document.createElement(tag);
    newElement.classList.add(className);
    this.boardElement.appendChild(newElement);
    return newElement;
  }

  updateBoard(snake) {
    this.renderSnake(snake);
    this.moveSnake(snake);
  }

  /**
   * Starts the game, running each iteration every [config.speed] milliseconds 
   * @param config optional configuration object to start the game
   */
  initGame(config = {
    snakeSize: 5,
    speed: 100
  }) {
    const snake = new Snake(config.snakeSize);
    this.renderSnake(snake);
    this.renderFood();
    this.interval = setInterval(() => {
      this.updateBoard(snake);
    }, config.speed);
  }
}