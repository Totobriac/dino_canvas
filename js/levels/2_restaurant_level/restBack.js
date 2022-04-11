import { dino, top } from "../../script.js";
import { generateCustomers } from "./customers.js";
import { generateChar } from "./backCharacters.js";
import { dinoXOffset, doorOffset, xOffset, charOffset } from "./dinoAnimation.js";

var restBackSprite = new Image();
restBackSprite.src = "./assets/2_restaurant/inside_no_door.png";

var seaSprite = new Image();
seaSprite.src = "./assets/2_restaurant/sea_animation_blue.png";

var outsideSprite = new Image();
outsideSprite.src = "./assets/2_restaurant/rampe_lg.png";

var leftDoorSprite = new Image();
leftDoorSprite.src = "./assets/2_restaurant/left_door.png";

var rightDoorSprite = new Image();
rightDoorSprite.src = "./assets/2_restaurant/right_door.png";

var dinoWalk = new Image();
dinoWalk.src = "./assets/dino/dino_walk_left.png";

var dinoWalkR = new Image();
dinoWalkR.src = "./assets/dino/dino_walk.png";

var dinoStillSprite = new Image();
dinoStillSprite.src = "./assets/dino/dino_still_left.png";

var dinoStillRSprite = new Image();
dinoStillRSprite.src = "./assets/dino/dino_still.png";

var gradHatSprite = new Image();
gradHatSprite.src = "./assets/2_restaurant/grad_hat.png";

var skySprite = new Image();
skySprite.src = "./assets/2_restaurant/sky.png";

function generateBack(ctx, left) {

  if (dino.state === "walkin") {
    dinoXOffset < 520 ? ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, 1100 + left - dinoXOffset, 165 + top, 66, 70) : ctx.drawImage(dinoStillSprite, 0, 0, 90, 99, 580 + left, 165 + top, 66, 70);
  }
  if (dino.state === "comingBack") {
    dinoXOffset < 530 ? ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, left + dinoXOffset, 165 + top, 66, 70) : ctx.drawImage(dinoStillRSprite, 0, 0, 90, 99, 530 + left, 165 + top, 66, 70);
    ctx.drawImage(gradHatSprite, left + dinoXOffset + 18, 165 + top - 26, 55, 55);
  }
  ctx.drawImage(leftDoorSprite, 542 - doorOffset + charOffset + left, 105 + top, 78, 140);
  ctx.drawImage(rightDoorSprite, 620 + doorOffset + charOffset + left, 105 + top, 78, 140);
  ctx.drawImage(restBackSprite, xOffset, 0, 600, 200, left, top, 1200, 400);
}

const seaAnim = {
  frames: 6,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

function generateSea(ctx, left) {
  ctx.drawImage(skySprite, 0, 0, 1200, 820, left , top - 1500 + 820, 1200,820);

  seaAnim.tickCount += 1;
  checkFrame(seaAnim);
  ctx.drawImage(seaSprite, xOffset * 0.1 - 32, 20 + (241 * seaAnim.frameIndex), 1200, 241, left, 140 + top, 1200, 241);
  ctx.drawImage(outsideSprite, xOffset * 0.8 , 0, 600, 49, left, top + 159, 1200, 98);
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
  generateChar(ctx, game, dino);
  generateBack(ctx, left);
  generateCustomers(ctx, left);
}

export { generateBack, generateRestBack };
