import { dino, top } from "../../script.js";
import { generateCustomers } from "./customers.js";
import { generateChar } from "./backCharacters.js";
import { isEntering, dinoXOffset, doorOffset, xOffset, charOffset, isComingBack } from "./dinoAnimation.js";

const restBackSprite = new Image();
restBackSprite.src = "./assets/2_restaurant/inside_no_door.png";

const seaSprite = new Image();
seaSprite.src = "./assets/2_restaurant/sea_animation.png";

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


function generateBack(ctx, left) {
  if (!isEntering) {
    dinoXOffset < 520 ? ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, 1100 + left - dinoXOffset, 165 + top, 66, 70) : ctx.drawImage(dinoStillSprite, 0, 0, 90, 99, 580 + left, 165 + top, 66, 70);
  }
  if (isComingBack) {
    ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, left + dinoXOffset, 165 + top, 66, 70)
  }
  ctx.drawImage(leftDoorSprite, 542 - doorOffset + charOffset + left, 105 + top, 78, 140);
  ctx.drawImage(rightDoorSprite, 620 + doorOffset + charOffset + left, 105 + top, 78, 140);
  ctx.drawImage(restBackSprite, xOffset, 0, 600, 200, left, 0 + top, 1200, 400);
}

const seaAnim = {
  frames: 6,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

function generateSea(ctx, left) {
  seaAnim.tickCount += 1;
  checkFrame(seaAnim);
  ctx.drawImage(seaSprite, xOffset * 0.1, 20 + (241 * seaAnim.frameIndex), 1280, 241, left, 90 + top, 1290, 241);
  ctx.drawImage(outsideSprite, xOffset * 0.8, 0, 982, 49, left, 159 + top, 982 * 1.8, 49 * 1.8);
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
  generateChar(ctx, game);
  generateBack(ctx, left);
  generateCustomers(ctx, left);
}

export { generateBack, generateRestBack };
