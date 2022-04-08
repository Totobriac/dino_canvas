var skySprite = new Image();
skySprite.src = "./assets/2_restaurant/sky.png";

var seaSprite = new Image();
seaSprite.src = "./assets/2_restaurant/sea_animation_blue.png";

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;

var xOffset = 0;
var yOffset = 0;

var seaOffset = 0;


var zoomOut = false;

const seaAnim = {
  frames: 6,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}



function drawOpening(ctx, left, top) {

  if (!zoomOut) {
    yOffset < 750 ? yOffset += 1 : zoomOut = true;;
    ctx.drawImage(skySprite, 300, yOffset, 600, 200, left, top, 1200, 400);

    animSea();

    if (yOffset >= 620 && yOffset < 750) {
      seaOffset += 2;
    }
    ctx.drawImage(seaSprite, 300, 20 + (241 * seaAnim.frameIndex), 600, 110, left, top + 400 - seaOffset, 1200, 260);

  } else {

    if (xOffset < 100) {
      xOffset++;
    }
    ctx.drawImage(skySprite, 0, 0, 1200, 820, left - 600 + (xOffset * 6), top - 1500 + (xOffset * 8.2), 2400 - (xOffset * 12), 1640 - (xOffset * 8.2),);
    animSea();

    ctx.drawImage(seaSprite, 300 - (xOffset * 3), 20 + (241 * seaAnim.frameIndex), 600 + (xOffset * 6), 110 + (xOffset * 1.1), left, top + 140, 1200, 260);
  }
  drawBottMask(ctx, top);

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

export { drawOpening };