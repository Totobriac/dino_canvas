const traySprite = new Image();
traySprite.src = "../assets/restaurant_level/tray.png";

var trayX;

export function createtray(ctx, dino) {
  dino.isWalkingLeft === false ? trayX = 48 : trayX = -32;
  ctx.drawImage(traySprite, dino.x + trayX, dino.y + 10,);
}