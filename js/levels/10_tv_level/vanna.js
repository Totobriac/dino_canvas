var ladySprite = new Image();
ladySprite.src = "./assets/10_tv/lady.png";

class Vanna {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.maxTickCount = 12;
    this.tickCount = 0;
    this.frame = 0;
    this.speed = 2;
    this.isClapping = false;
    this.goTo = 0;
    this.isMoving = false;
    this.rowToFlip;
    this.walkingBack = false;
    this.isStanding = true;
  }
  update(frames, speed, loop) {
    this.maxTickCount = speed;
    if (this.tickCount > this.maxTickCount) {
      this.frame < frames ? this.frame++ : loop ? this.frame = 0 : this.walkingBack = true;
      this.tickCount = 0;
    } else {
      this.tickCount++;
    }
  }
  standing() {
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, 0, 0, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  clapping() {
    if (this.frame > 1) this.frame = 0;
    this.update(1, 12, true);
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, this.frame * 28, 0, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  walkingToTile(x) {
    this.update(7, 12, true);
    this.x < x ? this.x += this.speed : this.goTo = 0;
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, this.frame * 28, 73, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  setGoTo(nb) {
    this.goTo = nb;
    this.isMoving = true;
    this.isStanding = false;
  }
  flip() {
    if (this.frame > 1) this.frame = 0;
    this.update(1, 36, false);
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, this.rowToFlip * 56 + this.frame * 28, 146, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  setToFlip(nb) {
    console.log(nb);
    this.rowToFlip = nb;
  }
  backToPlace() {
    this.update(7, 12, true);
    this.x > 272 ? this.x -= this.speed : this.isStanding = true;
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, this.frame * 28, 219, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  reset() {
    this.goTo = 0;
    this.rowToFlip = undefined;
    this.isMoving = false;
    this.walkingBack = false;   
  }
  draw() {
    if (this.isStanding) {
      this.standing();
    } else if (this.isClapping) {
      this.clapping();
    } else if (this.goTo != 0) {
      this.walkingToTile(this.goTo)
    } else if (this.walkingBack) {
      this.backToPlace();
    } else if (this.rowToFlip != undefined) {
      this.flip();
    } 
  }
}

export { Vanna };