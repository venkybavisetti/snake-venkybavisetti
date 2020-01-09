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

const drawSnake = function(snake) {
  snake.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add('snake');
  });
};

const eraseTail = function([colId, rowId]) {
  const cell = getCell(colId, rowId);
  cell.classList.remove('snake');
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const moveSnake = function() {
  const [headX, headY] = snake[snake.length - 1];
  const tail = snake.shift();

  const [deltaX, deltaY] = DELTAS[snakeDirection];

  snake.push([headX + deltaX, headY + deltaY]);
  eraseTail(tail);
  drawSnake(snake);
};

const handleKeyPress = () => {
  snakeDirection = (snakeDirection + 1) % 4;
};

let snakeDirection = EAST;
const snake = [40, 41, 42].map(x => [x, 25]);

const main = function() {
  createGrids();
  drawSnake(snake);
  setInterval(moveSnake, 200);
};
