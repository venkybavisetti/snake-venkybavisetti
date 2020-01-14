class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
    this.eatenFood = [0, 0];
    this.scoreCard = 0;
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  grow() {
    this.positions.unshift(this.previousTail);
  }

  headAtPoint(food) {
    const [foodX, foodY] = food;
    const [headX, headY] = this.positions[this.positions.length - 1];
    const headAtFood = foodX == headX && foodY == headY;
    if (headAtFood) {
      this.eatenFood = food;
      this.grow();
      this.scoreCard += 1;
    }
    return headAtFood;
  }
  headTouchesBox(box) {
    const [headX, headY] = this.positions[this.positions.length - 1];
    const { NUM_OF_COLS, NUM_OF_ROWS } = box;
    return (
      [NUM_OF_ROWS, -1].includes(headY) || [NUM_OF_COLS, -1].includes(headX)
    );
  }

  get previousFood() {
    return this.eatenFood;
  }

  headTouchesBody() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    const snakeBody = this.positions.slice(0, -1);
    return snakeBody.some(
      ([bodyPartX, bodyPartY]) => headX == bodyPartX && headY == bodyPartY
    );
  }
}
