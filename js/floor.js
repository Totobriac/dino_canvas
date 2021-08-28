const floorSprite = new Image();
floorSprite.src = "../assets/floor.png";

const floor = {
  x1: 0,
  x2: floorSprite.width,
  y: 352,
  width: floorSprite.width,
  height: floorSprite.height,
}

export function generateFloor(ctx, gamespeed) {
  if (floor.x1 <= -floor.width) {
    floor.x1 = floor.width
  }
  else {
    floor.x1 -= gamespeed
  }
  if (floor.x2 <= -floor.width) {
    floor.x2 = floor.width
  }
  else {
    floor.x2 -= gamespeed
  }
  ctx.drawImage(floorSprite, floor.x1, floor.y, floor.width, floor.height)
  ctx.drawImage(floorSprite, floor.x2, floor.y, floor.width, floor.height)
}