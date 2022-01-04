function drawFloorCeiling(ctx) {
  ctx.fillStyle = '#666666';
  ctx.fillRect(300, 0, 600, 200);
  ctx.fillStyle = '#752300';
  ctx.fillRect(300, 200, 600, 400);
}

var hall = {
  bluePrint: [
    [7, 8, 8, 7, 7, 7, 7, 8, 7, 7, 8, 7, 8, 7, 8],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 13],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [12, 7, 8, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [4, 0, 0, 0, 13, 102, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 7, 7, 5, 6, 7, 7, 8, 9, 8, 10, 1, 1]
  ]
};

var corridor = {
  bluePrint: [
    [4, 13, 3],
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
  ]
};

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


var doors = [100, 101, 102, 103];

var levels = [corridor, hall];

var tileSize = 40;

class Level {

  constructor(canvas) {
    this.grid = hall.bluePrint;
    this.canvas = canvas;
    this.gridHeight = this.grid.length;
    this.gridWidth = this.grid[0].length;
    this.tileHeight = tileSize;
    this.tileWidth = tileSize;

    this.tickCount = 0;
    this.maxTickCount = 12;
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
        this.grid = corridor.bluePrint;
        break;
      case 101:
        this.grid = hall.bluePrint;
        break;
      case 102:
        this.grid[8][4] = 0;
        break;
      case 103:

    }
  }
  levelAnimate() {
    this.tickCount++;
    if (this.tickCount > this.maxTickCount) {
      this.tickCount = 0;
      this.grid[7][0] === 12 ? this.grid[7][0] = 11 : this.grid[7][0] = 12;
    }
  }
}

export {
  drawFloorCeiling,
  Level,
  doors,
}
