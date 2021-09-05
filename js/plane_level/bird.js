const birdSprite = new Image();
birdSprite.src = "../assets/plane_level/bird.png"

const birdArray = [];

class Bird {
  constructor(ctx, gamespeed) {
    this.x = canvas.width;
    this.y = Math.random() * 300;
    this.ticksPerFrame = 12;
    this.ctx = ctx;
    this.gamespeed = gamespeed;
    this.frameIndex = 0;
    this.frames = 2;
    this.tickCount = 0;
  }
  draw(ctx) {
    ctx.drawImage(birdSprite, this.frameIndex * 92, 0, 92, 80, this.x, this.y, 46, 40)
  }
  update() {
    this.x -= this.gamespeed;
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    this.draw(this.ctx)
  }
}

export function createBirds(ctx, gamespeed, frame) {
  if (frame % 200 === 0) {
    birdArray.unshift(new Bird(ctx, gamespeed));
  }
  for (let i = 0; i < birdArray.length; i++) {
    birdArray[i].update();
  }
  if (birdArray.length > 8) {
    birdArray.pop(birdArray[0])
  }
}
