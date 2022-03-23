export class Dino {
  constructor() {
    this.x = 130;
    this.vx = 0;
    this.y = 20;
    this.vy = 0;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.mouseX = 600;
    this.mouseY = 200;
    this.radius = 40;
    this.score = 190;
    this.isHit = false;
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
    if (this.x > 870) {
      this.x = 870;
      this.vx = 0;
    }
  }
  checkCollision(dinoWidth, dinoHeight, spriteX, spriteY, spriteWidth, spriteHeight) {
    if (this.x + dinoWidth < spriteX || this.x > spriteX + spriteWidth ||
      this.y + dinoHeight < spriteY || this.y > this.spriteY + spriteHeight) {
      return false;
    } else return true;
  }
}
