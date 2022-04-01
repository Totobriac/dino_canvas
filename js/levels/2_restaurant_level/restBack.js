import { dino } from "../../script.js";
import { attends, ready, stillPlaying } from "./startLevel2.js";
import { brokenPlates } from "./plates.js";

let passerbyArray = [];

var xOffset = 320;
var charOffset = 0;
var doorOffset = 0;
var dinoXOffset = 0;
var dinoYOffset = 0;
var isEntering = false;
var isChanging = false;
var isChanged = false;
var hasBroom = false;
var isHigh = false;
var speed = 0;
var isSweeping = false;


const restBackSprite = new Image();
restBackSprite.src = "./assets/2_restaurant/inside_no_door.png";

const seaSprite = new Image();
seaSprite.src = "./assets/2_restaurant/sea_animation.png";

const customerSprite = new Image();
customerSprite.src = "./assets/2_restaurant/rest_customers_stupid_air.png";

const guybrushSprite = new Image();
guybrushSprite.src = "./assets/2_restaurant/guy.png";

const outsideSprite = new Image();
outsideSprite.src = "./assets/2_restaurant/rampe_original.png";

var leftDoorSprite = new Image();
leftDoorSprite.src = "./assets/2_restaurant/left_door.png";

var rightDoorSprite = new Image();
rightDoorSprite.src = "./assets/2_restaurant/right_door.png";

const dinoWalk = new Image();
dinoWalk.src = "./assets/dino/dino_walk_left.png";

const dinoWalkR = new Image();
dinoWalkR.src = "./assets/dino/dino_walk.png";

const dinoStillSprite = new Image();
dinoStillSprite.src = "./assets/dino/dino_still_left.png";

const cookSprite = new Image();
cookSprite.src = "./assets/2_restaurant/cook.png";

const tableEdgeSprite = new Image();
tableEdgeSprite.src = "./assets/2_restaurant/table_edge.png";

const traySprite = new Image();
traySprite.src = "./assets/2_restaurant/tray.png";

const broomSprite = new Image();
broomSprite.src = "./assets/2_restaurant/broom.png";

function generateBack(ctx, left) {
  if (!isEntering) {
    dinoXOffset < 520 ? ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, 1100 + left - dinoXOffset, 165, 66, 70) : ctx.drawImage(dinoStillSprite, 0, 0, 90, 99, 580 + left, 165, 66, 70);
  }
  ctx.drawImage(leftDoorSprite, 542 - doorOffset + charOffset + left, 105, 78, 140);
  ctx.drawImage(rightDoorSprite, 620 + doorOffset + charOffset + left, 105, 78, 140);
  ctx.drawImage(restBackSprite, xOffset, 0, 600, 200, left, 0, 1200, 400);
}

const seaAnim = {
  frames: 6,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

const mustache = {
  frames: 3,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

const lady = {
  frames: 2,
  frameIndex: 0,
  ticksPerFrame: 18,
  tickCount: 0,
}

const bold = {
  frames: 4,
  frameIndex: 0,
  ticksPerFrame: 24,
  tickCount: 0,
}

const cook = {
  frames: 8,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

class Guybrush {
  constructor(ctx, game) {
    this.x = 0;
    this.y = 140;
    this.frames = 6;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.ctx = ctx;
    this.gamespeed = game.gamespeed;
  }
  updateGuy() {
    this.tickCount += 1;
    this.x += this.gamespeed * 0.2;
    this.drawGuy();
  }
  drawGuy() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    this.ctx.drawImage(guybrushSprite, 110 * this.frameIndex, 0, 110, 150, this.x, this.y, 77, 105);
  }
}

function generateSea(ctx, left) {
  seaAnim.tickCount += 1;
  checkFrame(seaAnim);
  ctx.drawImage(seaSprite, xOffset * 0.1, 20 + (241 * seaAnim.frameIndex), 1280, 241, left, 90, 1290, 241);
  ctx.drawImage(outsideSprite, xOffset * 0.8, 0, 982, 49, left, 159, 982 * 1.8, 49 * 1.8);
}

function generateCustomers(ctx, left) {
  mustache.tickCount += 1;
  checkFrame(mustache);
  ctx.drawImage(customerSprite, 50 * mustache.frameIndex, 0, 50, 84, -444 + charOffset + left, 210, 60, 101);
  lady.tickCount += 1;
  checkFrame(lady);
  ctx.drawImage(customerSprite, 150 + (50 * lady.frameIndex), 0, 50, 84, -310 + charOffset + left, 212, 60, 101);
  bold.tickCount += 1;
  checkFrame(bold);
  ctx.drawImage(customerSprite, 250 + (50 * bold.frameIndex), 0, 50, 84, 180 + charOffset + left, 210, 60, 101);
  cook.tickCount += 1;
  checkFrame(cook);
  ctx.drawImage(cookSprite, (50 * cook.frameIndex), 0, 50, 100, 1000 + charOffset + left, 155, 60, 120);
  ctx.drawImage(tableEdgeSprite, 208 + charOffset + left, 270, 126, 22);
  ctx.drawImage(tableEdgeSprite, -408 + charOffset + left, 270, 126, 22);
}

function generateGuyBrush(ctx, game) {
  if (game.frame % 1300 === 0) {
    passerbyArray.unshift(new Guybrush(ctx, game));
  }
  for (let i = 0; i < passerbyArray.length; i++) {
    passerbyArray[i].updateGuy();
  }
  if (passerbyArray.length > 2) {
    passerbyArray.pop(passerbyArray[0])
  }
}

function checkFrame(sprite) {
  if (sprite.tickCount > sprite.ticksPerFrame) {
    sprite.tickCount = 0;
    if (sprite.frameIndex < sprite.frames - 1) {
      sprite.frameIndex += 1;
    } else {
      sprite.frameIndex = 0;
    }
  }
}

function generateRestBack(ctx, game, left) {
  dino.tickCount += 1;
  dino.checkFrame(2);
  generateSea(ctx, left);
  generateGuyBrush(ctx, game);
  generateBack(ctx, left);
  generateCustomers(ctx, left);
}

function dinoEntrance(ctx, left, newHeight) {
  if (!isEntering) {

    if (dinoXOffset < 520) {
      dinoXOffset++;
    } else {
      if (doorOffset < 78) {
        doorOffset += 0.5;
      } else {
        isEntering = true;
      }
    }
  }
  if (isEntering && xOffset > 0) {
    dino.x = 580 + left;
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset, 66, 70);
    if (dinoYOffset > -135) dinoYOffset--;
    if (doorOffset > 0 && dinoYOffset < -5) doorOffset -= 1;
    if (dinoYOffset === -135) moveLeft();
  }
  if (isChanging) {
    dino.y = 300;
    if (!isChanged) {
      dino.x < 1100 + left ? dino.x += 2 : isChanged = true;
      ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset, 66, 70);
    }
    else {
      if (dino.x > 580) {
        dino.x -= 2
      } else {
        ready();
        isChanging = false;
      }
      ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset, 66, 70);
      ctx.drawImage(traySprite, dino.x - 32, dino.y + 10);
    }
  }
  if (!stillPlaying && !isSweeping) {
    if (!hasBroom) {
      dino.x < 1000 + left ? dino.x++ : hasBroom = true;
      ctx.drawImage(traySprite, dino.x + 48, dino.y + 10);
      ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset, 66, 70);
    } else {
      speed += dino.gravity;
      dino.y > 200 && !isHigh ? dino.y -= 1 + speed : isHigh = true;

      if (dino.y <= newHeight - 68 && isHigh) {
        dino.y += 1 + speed;
      }
      if (dino.y > newHeight - 68) {
        isSweeping = true;
      }
      ctx.drawImage(dinoStillSprite, 0, 0, 90, 99, dino.x, dino.y, 66, 70);
      ctx.drawImage(broomSprite, 0, 0, 200, 200, dino.x - 12, dino.y + 10, 60, 60);
      dino.x -= 2;
    }
  }
  if (isSweeping) {
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, dino.y, 66, 70);
    ctx.drawImage(broomSprite, 0, 0, 200, 200, dino.x - 12 + dino.frameIndex * 4, dino.y + 10, 60, 60);
    dino.x -= 2;
    brokenPlates.forEach(plate => {
      if (dino.x - plate.x < 40) plate.x -= 2;
    });
  }
}

function moveLeft() {
  if (xOffset >= 1) {
    xOffset--;
    charOffset += 2;
  }
  if (xOffset === 0) {
    attends();
    isChanging = true;
  }
};


export { generateBack, moveLeft, generateRestBack, dinoEntrance };
