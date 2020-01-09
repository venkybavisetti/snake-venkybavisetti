const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

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

const createGrids = function() {
  const grid = getGrid();
  for (let rowId = 0; rowId < NUM_OF_COLS; rowId++) {
    for (let colId = 0; colId < NUM_OF_ROWS; colId++) {
      createCell(grid, colId, rowId);
    }
  }
};

const createSnake = () => [40, 41, 42].map(x => [x, 25]);

const main = function() {
  const snake = createSnake();

  createGrids();
  drawSnake(snake);
};
