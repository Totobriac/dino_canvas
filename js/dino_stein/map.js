function drawFloorCeiling(ctx) {
  ctx.fillStyle = '#666666';
  ctx.fillRect(300, 0, 600, 200);
  ctx.fillStyle = '#752300';
  ctx.fillRect(300, 200, 600, 400);
}

var lev = [
  [1, 1, 2, 1, 1, 1, 2, 2, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var tileSize = 40;

class Level {

  constructor(canvas) {    
    this.grid = lev;
    this.canvas = canvas;
    this.gridHeight = this.grid.length;
    this.gridWidth = this.grid[0].length;
    this.tileHeight = tileSize;
    this.tileWidth = tileSize;
  }
  colision(x, y) {
    var hit = false;
    if (this.grid[y][x] != 0)
      hit = true;
    return hit;
  }
  tile(x, y) {
    var squareX = parseInt(x / this.tileWidth);
    var squareY = parseInt(y / this.tileHeight);
    return (this.grid[squareY][squareX]);
  }
}

export { drawFloorCeiling, Level }