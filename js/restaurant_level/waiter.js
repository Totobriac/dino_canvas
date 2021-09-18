const dinoWalk = new Image();
dinoWalk.src = "../assets/dino_walk.png";

const dinoWalkLeft = new Image();
dinoWalkLeft.src = "../assets/dino_walk_left.png";

const traySprite = new Image();
traySprite.src = "../assets/restaurant_level/tray.png";

import { dino } from "../script.js";

var walkLeft = false;
var width = 66;
var height = 70;
var trayX;

function walk(side) {
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
  createtray(ctx, dino);
};

function update(dino) {
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

export { walk }
