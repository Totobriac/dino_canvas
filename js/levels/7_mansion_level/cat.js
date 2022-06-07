import { dino } from "./gameMecanic.js";
import { Sprite } from "./sprite.js";
import { isTrapReady } from "./trap.js";
import { triggerTrap } from "./actions.js";

var catSitLeft = new Image();
catSitLeft.src = "./assets/7_mansion/cat_sit_left.png";

var flyingCat = new Image();
flyingCat.src = "./assets/7_mansion/cat_fly.png";

var runningCat = new Image();
runningCat.src = "./assets/7_mansion/running_cat.png";

var divingCat = new Image();
divingCat.src = "./assets/7_mansion/diving_cat.png";

var catWalkRight = new Image();
catWalkRight.src = "./assets/7_mansion/cat_walk_right.png";

var catWalkLeft = new Image();
catWalkLeft.src = "./assets/7_mansion/cat_walk_left.png";

var catSitRight = new Image();
catSitRight.src = "./assets/7_mansion/cat_sit_right.png";

var catTail = new Image();
catTail.src = "./assets/7_mansion/cat_tail.png";

var catFalling = new Image();
catFalling.src = "./assets/7_mansion/cat_falling_2.png";

var cat = new Sprite("chat", catSitLeft, -25, 135, 16, 4, 111.5, 83.5, 0.8, true, true);

var isDinoLeft = false;
var catOnTheFloor = false;
var isCatFree = true;

function drawCat(ctx) {
  if (!isTrapReady) {
    if (dino.x < 150) {
      isDinoLeft = true;
      if (cat.x < 230) {
        cat.update(3, 0);
      }
    } else {
      isDinoLeft = false;
    }
    if (isDinoLeft == false) {
      if (cat.x > -25) {
        cat.update(-3, 0);
      }
    }
    if (isDinoLeft) {
      if (cat.x == -25) cat.sprite = catSitLeft;
      if (cat.x > -25 && cat.x < 230) cat.sprite = catWalkRight;
      if (cat.x == 230) cat.sprite = catSitRight;
    } else {
      if (cat.x == -25) cat.sprite = catSitLeft;
      if (cat.x > -25 && cat.x < 230) cat.sprite = catWalkLeft;
    }
  } else {

    if(!triggerTrap) {
      cat.sprite = catWalkRight;
      if (cat.y < 315 && !catOnTheFloor) {
        cat.sprite = flyingCat;
        cat.frames = 4;
        cat.columns = 4;
        cat.update(3, 2.5);
      } else {
        catOnTheFloor = true;
        if (cat.x < 300) {
          cat.sprite = runningCat;
          cat.frames = 16;
          cat.columns = 4;
          cat.update(3, 0);
        } else if (cat.x < 460) {
          cat.sprite = flyingCat;
          cat.frames = 4;
          cat.columns = 4;
          cat.update(3, -1);
        } else {
          cat.sprite = catTail;
          cat.frames = 4;
          cat.columns = 4;
        }
      }
    } else {
       cat.loop = false;
       cat.sprite = catFalling;
       cat.frames = 11;
       cat.columns = 11;
       if (cat.frameIndex < 10) {
         cat.update(0.35, 1)
       }else {
         isCatFree = false;
       };
     }
  }
  cat.draw(ctx);
}

export { drawCat, cat, isCatFree };
