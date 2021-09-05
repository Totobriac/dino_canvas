const birdSprite = new Image();
birdSprite.src = "../assets/plane_level/bird.png"

const birdArray = [];

const origin = {x: 600, y: 1200 };
const radius = 900;
const start = 0.9272951769;
const end = 2.21429922;

let step = 0;
const totalSteps = 900;
const stepSize = (end - start)/totalSteps;


class Bird {
  constructor(ctx, gamespeed) {
    this.step = 0
    this.y = Math.random() * 300;
    this.ticksPerFrame = 12;
    this.ctx = ctx;
    this.gamespeed = gamespeed;
    this.frameIndex = 0;
    this.frames = 2;
    this.tickCount = 0;
  }
  draw(ctx) {
    if (this.step === totalSteps) this.step = 0;
    const angle = start + this.step++ * stepSize;  
    ctx.translate(origin.x, origin.y);
    ctx.rotate(-angle);    
    ctx.translate(radius, 0);
    ctx.rotate(Math.PI/2);  
    ctx.translate(0, 0);
    ctx.drawImage(birdSprite, this.frameIndex * 92, 0, 92, 80, 0, -this.y, 46, 40)
    ctx.resetTransform();
  }
  update() {
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
  if (birdArray.length > 4) {
    birdArray.pop(birdArray[0])
  }
}
