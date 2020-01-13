const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

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
    return this.snake.headTouchesBox(this.gridSize);
  }
}

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
    this.eatenFood = [0, 0];
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
}

class Food {
  constructor(colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  get position() {
    return [this.colId, this.rowId];
  }
}

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = "grid";

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + "_" + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const drawFood = function(food) {
  let [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add("food");
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const moveAndDrawSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), "snake");
};

const initGhostSnake = () => {
  const ghostSnakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(ghostSnakePosition, new Direction(SOUTH), "ghost");
};

const setup = game => {
  attachEventListeners(game.snake);
  createGrids();

  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
};

const eraseEatenFood = function(eatenFood) {
  const [colId, rowId] = eatenFood;
  const cell = getCell(colId, rowId);
  cell.classList.remove("food");
};

const runGame = function(game) {
  game.updateGame();
  const { snake, ghostSnake, food } = game.getGameStatus();
  if (game.isGameOver()) {
    alert("game over");
  }
  animateSnakes(snake, ghostSnake);
  eraseEatenFood(snake.previousFood);
  drawFood(food);
};

const main = function() {
  const gridSize = { NUM_OF_COLS, NUM_OF_ROWS };
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(5, 5);

  const game = new Game(snake, ghostSnake, food, gridSize);
  setup(game);

  setInterval(runGame, 90, game);
  setInterval(randomlyTurnSnake, 500, ghostSnake);
};
