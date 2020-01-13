const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

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
  // moveAndDrawSnake(ghostSnake);
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
