export class Dino {
  constructor() {
    this.x = 20;
    this.vx = 0;
    this.y = 300;
    this.vy = 0;    
    this.frames = 2;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;   
    this.isWalkingLeft = false;
    this.mouseX = 600;
    this.mouseY = 200;
    this.radius = 40;
  };
  update() {
    this.vy += 1;
    this.y += this.vy;
    this.x += this.vx;
    this.vx *= 0.99;
    this.tickCount += 1;
    this.checkBundaries();
    this.checkFrame(2);
  };
  checkFrame(frames) {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }
  checkBundaries() {
    if (this.y > 300) {
      this.y = 300;
      this.vy = 0;
    }
    if (this.x < 20) {
      this.x = 20;
      this.vx = 0;
    }
    if (this.x > 1120) {
      this.x = 1120;
      this.vx = 0;
    }
  }
}

