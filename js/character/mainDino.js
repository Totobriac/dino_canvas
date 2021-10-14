class Dino {
  constructor(ctx, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.isMoving = false;
    this.isWalkingLeft = true;
    this.scale;
  }
  checkFrame(frames) {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }
  draw(frames, columns, sprite, scale) {
    this.scale = scale
    this.checkFrame(frames);
    let column = this.frameIndex % columns;
    let row = Math.floor(this.frameIndex / columns);
    this.ctx.drawImage(sprite, column * this.spriteWidth, row * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * scale, this.spriteHeight * scale);
  }
  update(x,y) {
    this.x += x;
    this.y += y;
  }  
}

export { Dino }