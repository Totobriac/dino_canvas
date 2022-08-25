import { rideTheLightening } from "./outside_sprite.js";
import { playSound, stopSound } from "./sound.js";
import { game } from "../../script.js";

var tiles = [];
var startX = 0;
var startY = 0;
var tilesNb = 0;

var tickCount = 0;
var maxTickCount = 1;
var tile = 300;

var index = 0;

var wasDrawn = false;
var ind = 0;
var curtain = false;
var curtIndex = 0;

var msk = [
  16, 17, 18, 19, 20, 21,
  46, 47, 48, 49, 50, 51,
  76, 77, 78, 79, 80, 81,
  106, 107, 108, 109, 110, 111
];

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

  playSound("light");

  if (tickCount < maxTickCount) {
    tickCount++;
  } else {
    tickCount = 0;
    tile > 1 ? tile-- : drawCurtain(ctx);
  }

  if (!msk.includes(tiles[tile - 1].index)) tiles[tile - 1].isVisible = true;

  if (curtain) {
    ind++;
    if (ind < 240 ) {
      if (ind % 10 === 0 ) curtIndex++
    } else {
      leaveLevel();
    }
    var i = msk[curtIndex] - 1;
    tiles[i].isVisible = true;
  }

  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].isVisible) tiles[i].draw();
  }
}

function drawCurtain(ctx) {
  rideTheLightening();
  if (!wasDrawn) var draw = setTimeout(endSoundAndMask, 2500, ctx);
  wasDrawn = true;
}

function endSoundAndMask(ctx) {
  curtain = true;
}

function leaveLevel() {
  stopSound();
  game.switchLevel(8);
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

export {}
