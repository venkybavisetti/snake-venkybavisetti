class Game {
  constructor(snake, ghostSnake, food, gridSize) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.gridSize = gridSize;
  }
  getGameStatus() {
    return {
      snake: {
        location: this.snake.location,
        species: this.snake.species,
        previousTail: this.snake.previousTail,
        previousFood: this.snake.previousFood
      },
      ghostSnake: {
        location: this.ghostSnake.location,
        species: this.ghostSnake.species,
        previousTail: this.ghostSnake.previousTail
      },
      food: {
        position: this.food.position
      }
    };
  }

  updateGame() {
    if (this.snake.headAtPoint(this.food.position)) {
      let foodX = Math.floor(Math.random() * NUM_OF_COLS);
      let foodY = Math.floor(Math.random() * NUM_OF_ROWS);
      this.food = new Food(foodX, foodY);
    }
    this.snake.move();
    this.ghostSnake.move();
  }
  isGameOver() {
    console.log(this.snake.headTouchesBox(this.gridSize));
    return (
      this.snake.headTouchesBox(this.gridSize) || this.snake.headTouchesBody()
    );
  }
}
