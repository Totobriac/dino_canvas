export class Sprite {
  constructor(sprite,frames, columns, spriteWidth, spriteHeight, scale) {
    this.sprite = sprite;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.frames = frames;
    this.columns = columns;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.scale = scale;
  };
  checkFrame() {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }
  draw(ctx,x,y) {
    this.checkFrame();
    let column = this.frameIndex % this.columns;
    let row = Math.floor(this.frameIndex / this.columns);
    ctx.drawImage(this.sprite, column * this.spriteWidth, row * this.spriteHeight, this.spriteWidth, this.spriteHeight, x, y, this.spriteWidth * this.scale, this.spriteHeight * this.scale);
  }
}
