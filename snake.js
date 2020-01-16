class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }

  get location() {
    return this.#positions.slice();
  }

  get species() {
    return this.#type;
  }

  turnLeft() {
    this.#direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    this.#previousTail = this.#positions.shift();

    const [deltaX, deltaY] = this.#direction.delta;

    this.#positions.push([headX + deltaX, headY + deltaY]);
  }

  grow() {
    this.#positions.unshift(this.#previousTail);
  }

  headAtPoint(point) {
    const [pointX, pointY] = point;
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    const areHeadAtPoint = pointX == headX && pointY == headY;
    if (areHeadAtPoint) {
      this.grow();
    }
    return areHeadAtPoint;
  }

  headTouchesBox(box) {
    const { NUM_OF_COLS, NUM_OF_ROWS } = box;
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    return (
      [NUM_OF_ROWS, -1].includes(headY) || [NUM_OF_COLS, -1].includes(headX)
    );
  }

  headTouchesBody() {
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    const snakeBody = this.#positions.slice(0, -1);
    return snakeBody.some(
      ([bodyPartX, bodyPartY]) => headX == bodyPartX && headY == bodyPartY
    );
  }

  get previousTailPosition() {
    return this.#previousTail;
  }
}
