class Snake {
  constructor(snakeSize) {
    this.buildBody(snakeSize);
  }

  /**
   * Builds the snake body in a "linked-list" way, keeping track of the head and tail cells
   * @param size initial size of the snake
   */
  buildBody(size) {
    let prev = null;
    for (let i = size - 1; i >= 0; i--) {
      const newCell = new Snake.BodyCell({ x: i, y: 0 });
      prev = prev ? prev.setNextCell(newCell).getNextCell() : newCell;
      if (!this.head) {
        this.head = prev;
      }
      this.tail = prev;
    }
  }

  /**
   * Appends one cell to the tail of the snake, making this cell the new tail
   */
  grow() {
    const newCell = new Snake.BodyCell(this.tail.getPosition());
    this.tail.setNextCell(newCell);
    this.tail = newCell;
  }

  getHead() {
    return this.head;
  }

  /**
   * Moves the head to the next position, and all subsequent cells to its parent's position
   * @param position an {x, y} object with the coordinates
   */
  move(position) {
    let newPos = position;
    let currPos;
    let currCell = this.getHead();
    while(currCell) {
      currPos = currCell.getPosition();
      currCell.setPosition(newPos);
      newPos = currPos;
      currCell = currCell.getNextCell();
    }
  }
}

/**
 * Auxiliary class used to create the Snake cells and set references for its DOM elements
 */
Snake.BodyCell = class {
  constructor(pos) {
    this.setPosition(pos);
  }

  setNextCell(cell) {
    this.nextCell = cell;
    return this;
  }

  getNextCell() {
    return this.nextCell;
  }

  setPosition(pos) {
    this.position = pos;
  }

  /**
   * Sets the DOM element related to this cell
   * @param elem the DOM element to reference
   */
  setElement(elem) {
    this.element = elem;
  }

  getElement() {
    return this.element;
  }

  /**
   * Returns a new object with the cell's x and y coordinates
   * @returns {{x: *, y: *}}
   */
  getPosition() {
    return {
      x: this.position.x,
      y: this.position.y
    }
  }
};