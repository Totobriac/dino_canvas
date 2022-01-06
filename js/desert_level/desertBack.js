const mountainSprite = new Image();
mountainSprite.src = "../assets/desert_level/desert_back.png";

const bigM = {
  x1: 0,
  x2: mountainSprite.width,
  y: 120,
  width: mountainSprite.width,
  height: 245,
}

export var backX = 0

const smallM = {
  x1: 0,
  x2: mountainSprite.width,
  y: 245,
  width: mountainSprite.width,
  height: 300,
}

function generateBigBack(ctx, gamespeed) {
  if (bigM.x1 <= -bigM.width + gamespeed) {
    bigM.x1 = bigM.width
  }
  else {
    bigM.x1 -= gamespeed * 0.1
    backX = bigM.x1
  }
  if (bigM.x2 <= -bigM.width + gamespeed) {
    bigM.x2 = bigM.width
  }
  else {
    bigM.x2 -= gamespeed * 0.1
  }
  ctx.drawImage(mountainSprite, 0, 2, mountainSprite.width, 200, bigM.x1, bigM.y, bigM.width, bigM.height)
  ctx.drawImage(mountainSprite, 0, 2, mountainSprite.width, 200, bigM.x2, bigM.y, bigM.width, bigM.height)
}

function generateSmallBack(ctx, gamespeed) {
  if (smallM.x1 <= -smallM.width + gamespeed) {
    smallM.x1 = smallM.width
  }
  else {
    smallM.x1 -= gamespeed * 0.8
  }
  if (smallM.x2 <= -smallM.width + gamespeed) {
    smallM.x2 = smallM.width
  }
  else {
    smallM.x2 -= gamespeed * 0.8
  }
  ctx.drawImage(mountainSprite, 0, 244, mountainSprite.width, 320, smallM.x1, smallM.y, smallM.width, smallM.height)
  ctx.drawImage(mountainSprite, 0, 244, mountainSprite.width, 320, smallM.x2, smallM.y, smallM.width, smallM.height)
}

export function generateBack (ctx, gamespeed) {
  generateBigBack(ctx, gamespeed);
  generateSmallBack(ctx, gamespeed);
}