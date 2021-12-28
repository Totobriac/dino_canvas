function drawFloorCeiling(ctx) {
  ctx.fillStyle = '#666666';
  ctx.fillRect(300, 0, 600, 200);
  ctx.fillStyle = '#752300';
  ctx.fillRect(300, 200, 600, 400);
}

var hall = [
  [1, 1, 2, 1, 1, 1, 2, 2, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 10, 3],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var corridor = [
  [1, 3, 1],
  [1, 11, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 3],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 1]
];

var doors = [10, 11]

var tileSize = 40;

class Level {

  constructor(canvas) {
    this.grid = hall;
    this.canvas = canvas;
    this.gridHeight = this.grid.length;
    this.gridWidth = this.grid[0].length;
    this.tileHeight = tileSize;
    this.tileWidth = tileSize;
  }
  colision(x, y) {
    var hit = false;
    if (this.grid[y][x] != 0 && !doors.includes(this.grid[y][x]))
      hit = true;
    return hit;
  }
  tile(x, y) {
    var squareX = parseInt(x / this.tileWidth);
    var squareY = parseInt(y / this.tileHeight);
    return (this.grid[squareY][squareX]);
  }
  levelChange(door) {
    switch (door) {
      case 10:
        this.grid = corridor;
        break;
      case 11:
        this.grid = hall;
        break;
    }
  }
}

export {
  drawFloorCeiling,
  Level
}
