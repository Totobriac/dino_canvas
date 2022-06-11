import { rideTheLightening } from "./outside_sprite.js";

var tiles = [];
var startX = 0;
var startY = 0;
var tilesNb = 0;

var tickCount = 0;
var maxTickCount = 2;
var tile = 300;

var index = 0;

var msk =
  [16, 17, 18, 19, 20, 21,
    46, 47, 48, 49, 50, 51,
    76, 77, 78, 79, 80, 81,
    106, 107, 108, 109, 110, 111]

class Tile {
  constructor(x, y, index, ctx) {
    this.width = 40;
    this.height = 40;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.r = (Math.random() / 4) + 0.1;
    this.color = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    this.isVisible = true;
    this.index = index;
  }
  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  erase() {
    this.isVisible = false;
  }
}

export function drawIntro(ctx, game) {
  if (tiles.length === 0) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 30; j++) {
        index++;
        tiles.push(new Tile(j * 40, i * 40, index, ctx));
      }
    }
    startX = game.mouseMovePosition.x;
    startY = game.mouseMovePosition.y;
  }
  if (tilesNb < 300) {
    for (let i = 0; i < tiles.length; i++) {
      if (startX != game.mouseMovePosition.y && startY != game.mouseMovePosition.y) {
        if (checkCollsion(game, tiles[i]) && tiles[i].isVisible) {
          console.log(tiles[i].index);
          tiles[i].erase();
          tilesNb++;
        }
      }
      if (tiles[i].isVisible) tiles[i].draw();
    }
    return false;
  } else {
    return true;
  }
}


export function drawEnding(ctx) {
  if (tickCount < maxTickCount) {
    tickCount++;
  } else {
    tickCount = 0;
    tile > 1 ? tile-- : rideTheLightening();
  }
  if (!msk.includes(tiles[tile - 1].index)) tiles[tile - 1].isVisible = true;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].isVisible) tiles[i].draw();
  }
}

var checkCollsion = (game, tile) => {
  var mouseX = game.mouseMovePosition.x;
  var mouseY = game.mouseMovePosition.y;
  var x = tile.x;
  var y = tile.y;
  var width = tile.width;
  var height = tile.height;

  if (mouseX > x + width || mouseX < x || mouseY < y || mouseY > y + height) {
    return false;
  } else {
    return true;
  }
}

export { }