class Game {
  #snake;
  #ghostSnake;
  #food;
  #gridSize;
  #scoreCard;
  #previousFood;

  constructor(snake, ghostSnake, food, gridSize) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#gridSize = gridSize;
    this.#scoreCard = 0;
    this.#previousFood = [0, 0];
  }
  getGameStatus() {
    return {
      snake: {
        location: this.#snake.location,

        species: this.#snake.species,
        previousTail: this.#snake.previousTailPosition,
        previousFood: this.#previousFood,
        scoreCard: this.#scoreCard
      },
      ghostSnake: {
        location: this.#ghostSnake.location,
        species: this.#ghostSnake.species,
        previousTail: this.#ghostSnake.previousTailPosition
      },
      food: {
        position: this.#food.position
      }
    };
  }

  updateGame() {
    if (this.#snake.headAtPoint(this.#food.position)) {
      this.#previousFood = this.#food.position;
      let foodX = Math.floor(Math.random() * NUM_OF_COLS);
      let foodY = Math.floor(Math.random() * NUM_OF_ROWS);
      this.#food = new Food(foodX, foodY);
      this.#scoreCard += 5;
    }
    this.#snake.move();
    this.#ghostSnake.move();
  }
  isGameOver() {
    return (
      this.#snake.headTouchesBox(this.#gridSize) ||
      this.#snake.headTouchesBody()
    );
  }

  turnSnakeToLeft() {
    this.#snake.turnLeft();
  }
}
