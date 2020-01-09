const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

const GRID_ID = 'grid';

const DELTAS = {};
DELTAS[EAST] = [1, 0];
DELTAS[WEST] = [-1, 0];
DELTAS[NORTH] = [0, -1];
DELTAS[SOUTH] = [0, 1];

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
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

class Snake {
  constructor(positions, direction) {
    this.positions = positions.slice();
    this.direction = direction;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  turnLeft() {
    this.direction = (this.direction + 1) % 4;
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = DELTAS[this.direction];

    this.positions.push([headX + deltaX, headY + deltaY]);
  }
}

const snake = new Snake(
  [
    [40, 25],
    [41, 25],
    [42, 25]
  ],
  EAST
);

const ghostSnake = new Snake(
  [
    [40, 30],
    [41, 30],
    [42, 30]
  ],
  SOUTH
);

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove('snake');
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add('snake');
  });
};

const handleKeyPress = () => {
  snake.turnLeft();
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const main = function() {
  createGrids();
  drawSnake(snake);
  drawSnake(ghostSnake);

  setInterval(() => {
    moveAndDrawSnake(snake);
    moveAndDrawSnake(ghostSnake);
  }, 200);

  setInterval(() => {
    let x = Math.random() * 100;
    if (x > 50) {
      ghostSnake.turnLeft();
    }
  }, 500);
};
