var skySprite = new Image();
skySprite.src = "./assets/2_restaurant/sky.png";

var seaSprite = new Image();
seaSprite.src = "./assets/2_restaurant/sea_animation_blue.png";

var restBackSprite = new Image();
restBackSprite.src = "./assets/2_restaurant/inside_no_door.png";

var outsideSprite = new Image();
outsideSprite.src = "./assets/2_restaurant/rampe_original.png";

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

    if (xOffset < 200) {
      xOffset++;
    }
    ctx.drawImage(skySprite, 0, 0, 1200, 820, left - 600 + (xOffset * 3), top - 1500 + (xOffset * 4.1), 2400 - (xOffset * 6), 1640 - (xOffset * 4.1),);
    animSea();

    ctx.drawImage(seaSprite, 300 - (xOffset * 1.5), 20 + (241 * seaAnim.frameIndex), 600 + (xOffset * 3), 110 + (xOffset * 0.55), left, top + 140, 1200, 260);


    ctx.drawImage(outsideSprite, 300 - (xOffset * 1.5), 0, 600 + (xOffset * 3), 49, left, 159 + top, 982 * 1.8, 49 * 1.8);


    // ctx.drawImage(outsideSprite, 0, 0, 982, 49, left, 159 + top, 982 * 1.8, 49 * 1.8);

    ctx.drawImage(restBackSprite, 592 - (xOffset * 1.36), 54 - (xOffset * 0.27), 77 + (xOffset * 2.615), 26 + (xOffset * 0.87), left, top, 1200, 400);

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