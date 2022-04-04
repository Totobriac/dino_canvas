import {
  dino,
  top
} from "../../script.js";
import {
  attends,
  startCelebration,
  serviceOver
} from "./startLevel2.js";
import {
  brokenPlates
} from "./plates.js";

import {
  fireCook
} from "./customers.js";

var charOffset = 0;

var dinoWalk = new Image();
dinoWalk.src = "./assets/dino/dino_walk_left.png";

var dinoWalkR = new Image();
dinoWalkR.src = "./assets/dino/dino_walk.png";

var dinoStillSprite = new Image();
dinoStillSprite.src = "./assets/dino/dino_still_left.png";

var dinoStillRSprite = new Image();
dinoStillRSprite.src = "./assets/dino/dino_still.png";

var traySprite = new Image();
traySprite.src = "./assets/2_restaurant/tray.png";

var broomSprite = new Image();
broomSprite.src = "./assets/2_restaurant/broom.png";

var changingDoorSprite = new Image();
changingDoorSprite.src = "./assets/2_restaurant/changing_door.png";


var dinoXOffset = 0;
var doorOffset = 0;
var xOffset = 320;
var dinoYOffset = 0;
var hasBroom = false;
var isHigh = false;
var speed = 0;

function dinoAnim(ctx, left, newHeight) {
console.log(xOffset);
  if (dino.state === "walkin") {
    if (dinoXOffset < 520) {
      dinoXOffset++;
    } else {
      if (doorOffset < 78) {
        doorOffset += 0.5;
      } else {
        dino.updateState("entering");
        dinoXOffset = 0;
      }
    }
  }

  if (dino.state === "entering") {
    dino.x = 580 + left;
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
    if (dinoYOffset > -135) dinoYOffset--;
    if (doorOffset > 0 && dinoYOffset < -5) doorOffset -= 1;
    if (dinoYOffset === -135) dino.updateState("movingLeft");
  }

  if (dino.state === "movingLeft") {
    if (xOffset >= 1) {
      xOffset--;
      charOffset += 2;
    }
    if (xOffset === 0) {
      attends();
      dino.updateState("isChanging");
      fireCook();
    }
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);

  }

  if (dino.state === "isChanging") {
    dino.y = 300;
    dino.x < 1100 + left ? dino.x += 2 : dino.updateState("isChanged");
    ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
  }

  if (dino.state === "isChanged") {
    if (dino.x > 580) {
      dino.x -= 2
    } else {
      dino.updateState("working")
    }
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
    ctx.drawImage(traySprite, dino.x - 32, dino.y + 10 + top);
  }

  if (dino.state === "done") {
    dino.y = 165 - dinoYOffset + top;
    dino.x < 1000 + left ? dino.x += 2 : dino.updateState("jumping");
    ctx.drawImage(traySprite, dino.x + 48, dino.y + 10);
    ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
  }

  if (dino.state === "jumping") {
    speed += dino.gravity;
    dino.y > 200 + top && !isHigh ? dino.y -= 1 + speed : isHigh = true;

    if (dino.y <= newHeight - 68 + top && isHigh) {
      dino.y += 1 + speed;
    }
    if (dino.y > newHeight - 68 + top) {
      dino.updateState("isSweeping");
    }
    ctx.drawImage(dinoStillSprite, 0, 0, 90, 99, dino.x, dino.y, 66, 70);
    ctx.drawImage(broomSprite, 0, 0, 200, 200, dino.x - 12, dino.y + 10, 60, 60);
    dino.x -= 1;
  }

  if (dino.state === "isSweeping") {

    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, dino.y, 66, 70);
    ctx.drawImage(broomSprite, 0, 0, 200, 200, dino.x - 12 + dino.frameIndex * 4, dino.y + 10, 60, 60);

    if (dino.x > -80) {
      dino.x -= 2;
    } else {
      dino.updateState("comingBack")
      serviceOver();
    }
    brokenPlates.forEach(plate => {
      if (dino.x - plate.x < 40) plate.x -= 2;
    });
  }

  if (dino.state === "comingBack") {
    if (dinoXOffset < 350) {
      xOffset++;
      charOffset -= 2;
    }
    if (dinoXOffset < 530) {
      dinoXOffset++;
    } else {
      if (doorOffset < 78) {
        doorOffset += 0.5;
      } else {
        startCelebration();
        dino.updateState("backLikeChamp")
      }
    }
    dinoYOffset = 0;
  }

  if (dino.state === "backLikeChamp") {
    dino.x = 530 + left;
    ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
    if (dinoYOffset > -135) dinoYOffset--;
    if (doorOffset > 0 && dinoYOffset < -5) doorOffset -= 1;
    if (dinoYOffset === -135) dino.updateState("changingToCook");
  }

  if (dino.state === "changingToCook") {
    if (xOffset < 394) {
      xOffset++;
      charOffset -= 2;
      dinoXOffset++;
    } else {
      dino.x < 1000 + left ? dino.x++ : dino.updateState("goingUp");
    }
    ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
  }

  if (dino.state === "goingUp") {
    dinoYOffset < -50 ? dinoYOffset ++ : dino.updateState("enteringChangingRoom");
    ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
  }

  if (dino.state === "enteringChangingRoom") {
    dino.x < left + 1200 ? dino.x ++ : dino.updateState("exitingChangingRoom");
    ctx.drawImage(dinoWalkR, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
    ctx.drawImage(changingDoorSprite, left + 664, top, 536, 400);
  }

  if (dino.state === "exitingChangingRoom") {
    if (dino.x > 800 + left ) {
      dino.x --;
      ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
      ctx.drawImage(changingDoorSprite, left + 664, top, 536, 400);    } else {
      ctx.drawImage(dinoStillSprite, 0, 0, 90, 99, dino.x, 165 - dinoYOffset + top, 66, 70);
    }
  }
}


export {
  dinoAnim,
  dinoXOffset,
  doorOffset,
  xOffset,
  charOffset,
};
