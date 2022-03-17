const dinoWalk = new Image();
dinoWalk.src = "./assets/dino/dino_walk.png";

const dinoWalkLeft = new Image();
dinoWalkLeft.src = "./assets/dino/dino_walk_left.png";

const traySprite = new Image();
traySprite.src = "./assets/2_restaurant/tray.png";

import { dino, game } from "../../script.js";

var side = 1;
var walkLeft;
var width = 66;
var height = 70;
var trayX;

export function walk() {
  var key = game.keyDown.code;
  if (key === "ArrowRight") {
    side = 1;
  }
  else if (key === "ArrowLeft") {
    side = -1;
  }
  dino.vx = 4 * side;
  side === 1 ? walkLeft = false : walkLeft = true;
}

export function drawDinoWaiter(ctx, dino) {
  update(dino);  
  if (walkLeft === true) {
    ctx.drawImage(dinoWalkLeft, dino.frameIndex * 90, 0, 90, 99, dino.x, dino.y, width, height);
  }
  else {
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, dino.y, width, height);
  }
  if (game.level === 2) createtray(ctx, dino);
};

function update(dino) {
  walk();
  dino.y += dino.vy;
  dino.x += dino.vx;
  dino.vx *= 0.99;
  dino.tickCount += 1;
  dino.checkBundaries();
  dino.checkFrame(2);
}

function createtray(ctx, dino) {
  walkLeft === false ? trayX = 48 : trayX = -32;
  ctx.drawImage(traySprite, dino.x + trayX, dino.y + 10,);
}