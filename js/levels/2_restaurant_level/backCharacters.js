
const guybrushSprite = new Image();
guybrushSprite.src = "./assets/2_restaurant/guy.png";

let passerbyArray = [];

class Guybrush {
  constructor(ctx, game) {
    this.x = 0;
    this.y = 140;
    this.frames = 6;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.ctx = ctx;
    this.gamespeed = game.gamespeed;
  }
  updateGuy() {
    this.tickCount += 1;
    this.x += this.gamespeed * 0.2;
    this.drawGuy();
  }
  drawGuy() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    this.ctx.drawImage(guybrushSprite, 110 * this.frameIndex, 0, 110, 150, this.x, this.y, 77, 105);
  }
}

function generateGuyBrush(ctx, game) {
  if (game.frame % 1300 === 0) {
    passerbyArray.unshift(new Guybrush(ctx, game));
  }
  for (let i = 0; i < passerbyArray.length; i++) {
    passerbyArray[i].updateGuy();
  }
  if (passerbyArray.length > 2) {
    passerbyArray.pop(passerbyArray[0])
  }
}

export { generateGuyBrush };
