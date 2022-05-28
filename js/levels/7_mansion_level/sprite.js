export class Sprite {
  constructor(name, sprite, x, y, frames, columns, spriteWidth, spriteHeight, scale, male) {
    this.name = name;
    this.sprite = sprite;
    this.frameIndex = 0;
    this.ticksPerFrame = 6;
    this.tickCount = 0;
    this.frames = frames;
    this.columns = columns;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.scale = scale;
    this.x = x;
    this.y = y;
    this.male = male;
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
  draw(ctx) {
    this.checkFrame();
    let column = this.frameIndex % this.columns;
    let row = Math.floor(this.frameIndex / this.columns);
    ctx.drawImage(this.sprite, column * this.spriteWidth, row * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * this.scale, this.spriteHeight * this.scale);
  }
  checkCollision(x, y, w, h) {
    if (x + w < this.x || x > this.x + (this.spriteWidth * this.scale)) {
      return false;
    }
    else {
      if (y + h > this.y + (this.spriteHeight * this.scale) || y + h < this.y) {
        return false;
      }
      else {
        return true;
      }
    }
  }
  update(x, y) {
    this.x += x;
    this.y += y;
  }
}
