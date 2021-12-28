function drawFloorCeiling(ctx) {
  ctx.fillStyle = '#666666';
  ctx.fillRect(300, 0, 600, 200);
  ctx.fillStyle = '#752300';
  ctx.fillRect(300, 200, 600, 400);
}

var hall = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 100, 3],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 5, 6, 7, 8, 9, 10, 1, 1]
];

var corridor = [
  [4, 1, 3],
  [4, 101, 3],
  [4, 0, 3],
  [4, 0, 3],
  [5, 0, 3],
  [7, 0, 3],
  [7, 0, 3],
  [4, 0, 3],
  [4, 0, 3],
  [4, 0, 3],
  [4, 1, 3]
];

var floor = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


var doors = [100, 101]

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
      case 100:
        this.grid = corridor;
        break;
      case 101:
        this.grid = hall;
        break;
    }
  }
}

export {
  drawFloorCeiling,
  Level
}
