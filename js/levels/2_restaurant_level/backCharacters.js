import { top, left, ctx } from "../../script.js";

import * as pics from "./mJPics.js";

var picsList = [];

for (let i in Object.values(pics)) {
  picsList.push(Object.values(pics)[i])
};

var guybrushSprite = new Image();
guybrushSprite.src = "./assets/2_restaurant/guy.png";

var batmanSprite = new Image();
batmanSprite.src = "./assets/2_restaurant/MJ/moon_walk.png";

var enter = true;
var exit = false;
var entering;
var startToDance;
var exiting;

var dance;
var direction;
var oldDirection;

var loop = 0;
var mJx = 680;

var position = [
  { pose: pics.moonWalk, frames: 7, width: 40 },
  { pose: pics.moonWalkRight, frames: 7, width: 40 },
  { pose: pics.bend, frames: 3, width: 40 },
  { pose: pics.bendingHat, frames: 3, width: 40 },
  { pose: pics.danceLeft, frames: 15, width: 50 },
  { pose: pics.dance, frames: 15, width: 50 },
  { pose: pics.hat, frames: 8, width: 80 },
  { pose: pics.legUp, frames: 9, width: 50 },
  { pose: pics.salchi, frames: 10, width: 50 },
  { pose: pics.turn, frames: 6, width: 50 },
];

var isMikiKaKo = false;

class Character {
  constructor(ctx, game, sprite, x, y, direction, frames, speed, width, height, coef) {
    this.x = x;
    this.sprite = sprite;
    this.y = y + top;
    this.direction = direction;
    this.frames = frames;
    this.width = width;
    this.height = height;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.ctx = ctx;
    this.speed = speed;
    this.gamespeed = game.gamespeed;
    this.coef = coef;
  }
  updateChar() {
    this.tickCount += 1;
    this.x += this.gamespeed * this.speed * this.direction;
    this.drawChar();
  }
  drawChar() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    this.ctx.drawImage(this.sprite, this.width * this.frameIndex, 0, this.width, this.height, this.x, this.y, this.width * this.coef, this.height * this.coef);
  }
}


function generateChar(ctx, game, dino) {
  if (dino.state === "isChanged" && !isMikiKaKo) {
    entering = new Character(ctx, game, pics.moonWalk, 1100, 140, -1, 7, 0.2, 40, 67, 2.2);
    exiting = new Character(ctx, game, pics.moonWalk, mJx, 140, -1, 7, 0.2, 40, 67, 2.2);
    isMikiKaKo = true;
  }

  if (dino.state === "done") exit = true;

  if (isMikiKaKo) {

    if (enter) entering.updateChar();

    if (entering.x < 680) {
      enter = false;
      startToDance = true;
    }
    if (startToDance && !exit ) {
      if (loop > 0) {
        dance.updateChar();
        if (dance.frameIndex === dance.frames - 1) loop--;
      } else {
        if (dance) mJx = dance.x;
        poseChange(ctx, game);
      }
    }
    if (exit) {
      if (exiting.x > 0) exiting.updateChar();
    }
  }
}



function poseChange(ctx, game) {
  var pose = Math.floor(Math.random() * 9);
  loop = 1 + Math.floor(Math.random() * 2);

  if (pose != 0 && pose != 1) {
    direction = 0;
  } else {
    if (direction === 0) {
      oldDirection === 1 ? oldDirection = -1 : oldDirection = 1;
      direction = oldDirection;
    }
    else {
      direction === 1 ? direction = -1 : direction = 1;
    }
  }
  dance = new Character(ctx, game, position[pose].pose, mJx, 140, direction, position[pose].frames, 0.2, position[pose].width, 67, 2.2);
}

export { generateChar };
