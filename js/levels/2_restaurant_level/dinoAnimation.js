import { dino, top } from "../../script.js";
import { attends, ready, startCelebration, serviceOver } from "./startLevel2.js";
import { brokenPlates } from "./plates.js";

var charOffset = 0;

const dinoWalk = new Image();
dinoWalk.src = "./assets/dino/dino_walk_left.png";

const dinoWalkR = new Image();
dinoWalkR.src = "./assets/dino/dino_walk.png";

const dinoStillSprite = new Image();
dinoStillSprite.src = "./assets/dino/dino_still_left.png";

const traySprite = new Image();
traySprite.src = "./assets/2_restaurant/tray.png";

const broomSprite = new Image();
broomSprite.src = "./assets/2_restaurant/broom.png";


var dinoXOffset = 0;
var doorOffset = 0;
var xOffset = 320;
var dinoYOffset = 0;

var stillPlaying = true;
var isEntering = false;
var isChanging = false;
var isChanged = false;
var hasBroom = false;
var isHigh = false;
var speed = 0;
var isSweeping = false;
var isComingBack = false;

function dinoAnim(ctx, left, newHeight) {
  if (!isEntering && !isComingBack) {
    if (dinoXOffset < 520) {
      dinoXOffset++;
    } else {
      if (doorOffset < 78) {
        doorOffset += 0.5;
      } else {
        isEntering = true;
        dinoXOffset = 0;
      }
    }
  }
  if (isEntering && xOffset > 0 && !isComingBack) {
    dino.x = 580 + left;
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
    if (dinoYOffset > -135) dinoYOffset--;
    if (doorOffset > 0 && dinoYOffset < -5) doorOffset -= 1;
    if (dinoYOffset === -135 && !isComingBack) moveLeft();
  }
  if (isChanging && !isComingBack) {
    dino.y = 300;
    if (!isChanged) {
      dino.x < 1100 + left ? dino.x += 2 : isChanged = true;
      ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
    }
    else {
      if (dino.x > 580) {
        dino.x -= 2
      } else {
        ready();
        isChanging = false;
      }
      ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
      ctx.drawImage(traySprite, dino.x - 32, dino.y + 10 + top);
    }
  }
  if (!stillPlaying && !isSweeping && !isComingBack) {
    if (!hasBroom) {
      dino.y = 165 - dinoYOffset + top;
      dino.x < 1000 + left ? dino.x += 2 : hasBroom = true;
      ctx.drawImage(traySprite, dino.x + 48, dino.y + 10);
      ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, dino.y, 66, 70);
    } else {
      speed += dino.gravity;
      dino.y > 200 + top && !isHigh ? dino.y -= 1 + speed : isHigh = true;

      if (dino.y <= newHeight - 68 + top && isHigh) {
        dino.y += 1 + speed;
      }
      if (dino.y > newHeight - 68 + top) {
        isSweeping = true;
      }
      ctx.drawImage(dinoStillSprite, 0, 0, 90, 99, dino.x, dino.y, 66, 70);
      ctx.drawImage(broomSprite, 0, 0, 200, 200, dino.x - 12, dino.y + 10, 60, 60);
      dino.x -= 2;
    }
  }
  if (isSweeping && dino.x > -80) {
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, dino.y, 66, 70);
    ctx.drawImage(broomSprite, 0, 0, 200, 200, dino.x - 12 + dino.frameIndex * 4, dino.y + 10, 60, 60);
    dino.x -= 2;
    brokenPlates.forEach(plate => {
      if (dino.x - plate.x < 40) plate.x -= 2;
    });
  } else if (isSweeping && dino.x <= -80) {
    comeBack();
    serviceOver();
    isSweeping = false;
  }
  if (isComingBack) {
    if (dinoXOffset < 530) dinoXOffset++;
    if (dinoXOffset < 350) {
      xOffset++;
      charOffset -= 2;
    }
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


function stopGame() {
  stillPlaying = false;
}

function comeBack() {
  isComingBack = true;
}

export { dinoAnim, isEntering, dinoXOffset, stillPlaying, doorOffset, xOffset, charOffset, stopGame, isComingBack };
