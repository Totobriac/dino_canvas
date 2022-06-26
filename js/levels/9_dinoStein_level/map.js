import { createEnemies, removeEnemies } from "./enemy.js";
import { createSprites, removeSprites } from "./sprite.js";

function drawFloorCeiling(ctx) {
  ctx.fillStyle = '#666666';
  ctx.fillRect(300, 0, 600, 200);
  ctx.fillStyle = '#752300';
  ctx.fillRect(300, 200, 600, 400);
}

var start = {
  name: "start",
  bluePrint: [
    [3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 103, 3, 3, 3],
    [3, 3, 3, 13, 3, 3, 3],
  ],
  enemies: [],
  sprites: [
    [100, 300, 1, "items"],
    [200, 300, 1, "items"],
    [100, 250, 1, "items"],
    [200, 250, 1, "items"],
    [100, 200, 1, "items"],
    [200, 200, 1, "items"],
    [100, 150, 1, "items"],
    [200, 150, 1, "items"],
    [100, 100, 1, "items"],
    [200, 100, 1, "items"]
    ],
};


var hall = {
  name: "hall",
  bluePrint: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [13, 104, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 13],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  enemies: [],
  sprites: [],
  // enemies: [[318,95,"soldier_1"]],
  // sprites: [[60,230,10,"items"]],
};

var dirtyCorridor = {
  name: "dirtyCorridor",
  bluePrint: [
    [7, 8, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [13, 104, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 8, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0,7, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  enemies: [],
  sprites: [],
  // enemies: [[318,95,"soldier_1"]],
  // sprites: [[60,230,10,"items"]],
};

var corridor = {
  name: "corridor",
  bluePrint: [
    [7, 13, 7],
    [8, 101, 8],
    [7, 0, 7],
    [8, 0, 8],
    [7, 0, 7],
    [8, 0, 8],
    [7, 0, 7],
    [8, 0, 8],
    [7, 0, 7],
    [8, 105, 8],
    [7, 13, 7]
  ],
  enemies: [],
  sprites: [[60,332,3,"items"],[60,147,3,"items"]],
};

var floor = {
  name: "floor",
  bluePrint: [
    [1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 106, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  enemies: [[64,320,"boss"]],
  sprites: [],
}

var doors = [100, 101, 102, 103, 104, 105, 106];
var levels = [corridor, hall, start, floor, dirtyCorridor];
var tileSize = 40;

class Level {
  constructor(canvas) {
    this.level = start;
    this.grid = this.level.bluePrint;
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
  levelChange(level) {
    switch (level) {
      case 102:
        this.grid[8][4] = 0;
        return;
    }
    this.level = level;
    this.grid = this.level.bluePrint;
    removeEnemies();
    removeSprites();
    createEnemies(this.level.enemies);
    createSprites(this.level.sprites);
  }
  levelAnimate() {
    this.tickCount++;
    if (this.tickCount > this.maxTickCount && this.level.name === "hall") {
      this.tickCount = 0;
      //this.grid[7][0] === 12 ? this.grid[7][0] = 11 : this.grid[7][0] = 12;
    }
  }
}

export { drawFloorCeiling, Level, doors, levels };
