import { endAnimation } from "./startLevel2.js";

var skySprite = new Image();
skySprite.src = "./assets/2_restaurant/sky.png";

var seaSprite = new Image();
seaSprite.src = "./assets/2_restaurant/sea_animation_blue.png";

var restBackSprite = new Image();
restBackSprite.src = "./assets/2_restaurant/inside_no_door.png";

var leftDoorSprite = new Image();
leftDoorSprite.src = "./assets/2_restaurant/left_door.png";

var rightDoorSprite = new Image();
rightDoorSprite.src = "./assets/2_restaurant/right_door.png";

var rampSprite = new Image();
rampSprite.src = "./assets/2_restaurant/rampe_lg.png";

const cookSprite = new Image();
cookSprite.src = "./assets/2_restaurant/cook_intro_anim.png";

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;

var xOffset = 0;
var yOffset = 0;
var seaOffset = 0;
var zoomOut = false;
var doorOffset = 78;
var closeDoor = false;

var alpha = 0;

const seaAnim = {
  frames: 6,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

const cook = {
  frames: 8,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}


function drawOpening(ctx, left, top) {

  if (!zoomOut) {
    yOffset < 750 ? yOffset += 1 : zoomOut = true;

    ctx.save();
    alpha += 0.003;
    ctx.globalAlpha = alpha;
    ctx.drawImage(skySprite, 300, yOffset, 600, 200, left, top, 1200, 400);
    ctx.restore();

    animSea();

    if (yOffset >= 620 && yOffset < 750) {
      seaOffset += 2;
    }

    ctx.drawImage(seaSprite, 332, 20 + (241 * seaAnim.frameIndex), 600, 110, left, top + 400 - seaOffset, 1200, 260);

  } else {
    if (xOffset < 400) {
      xOffset++;
    } else if (xOffset === 400 && doorOffset > 0) {
      closeDoor = true;
      doorOffset -= 0.5;
    } else if (doorOffset === 0) {
      endAnimation();
    }

    ctx.drawImage(skySprite, 0, 0, 1200, 820, left - 600 + (xOffset * 1.5), top - 1500 + (xOffset * 2.05), 2400 - (xOffset * 3), 1640 - (xOffset * 2.05),);
    animSea();
    ctx.drawImage(seaSprite, 332 - (xOffset * 0.75), 20 + (241 * seaAnim.frameIndex), 600 + (xOffset * 1.5), 110 + (xOffset * 0.275), left, top + 140, 1200, 260);

    ctx.drawImage(rampSprite, 592 - (xOffset * 0.68), 0, 77 + (xOffset * 1.3075), 26 + (xOffset * 0.435), left, top + 199 - (xOffset * 0.1), 1200, 400);

    if (closeDoor) drawDoor(ctx, left, top);
    ctx.drawImage(restBackSprite, 592 - (xOffset * 0.68), 54 - (xOffset * 0.135), 77 + (xOffset * 1.3075), 26 + (xOffset * 0.435), left, top, 1200, 400);

    drawChar(ctx, left, top);
  }
  drawBottMask(ctx, top);
}

function drawDoor(ctx, left, top) {
  ctx.drawImage(leftDoorSprite, 542 - doorOffset + left, 105 + top, 78, 140);
  ctx.drawImage(rightDoorSprite, 620 + doorOffset + left, 105 + top, 78, 140);
}

function animSea() {
  seaAnim.tickCount += 1;
  checkFrame(seaAnim);
}

function drawBottMask(ctx, top) {
  ctx.fillStyle = "white";
  var maskHeight = winHeight - top - 400;
  ctx.fillRect(0, top + 400, winWidth, maskHeight);
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

function drawChar(ctx, left, top) {
  cook.tickCount += 1;
  checkFrame(cook);
  ctx.drawImage(cookSprite, 1184 - (xOffset * 1.36), 108 - (xOffset * 0.27) + (400 * cook.frameIndex), 154 + (xOffset * 2.615), 52 + (xOffset * 0.87), left, top, 1200, 400);
}

export { drawOpening };
