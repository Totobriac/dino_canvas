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
    this.speed = 4;
    this.isClapping = false;
    this.goTo = 0;
    this.isMoving = false;
    this.rowToFlip;
    this.walkingBack = false;
    this.isStanding = true;
    this.exiting = false;
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
    this.isMoving = false;
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
    this.rowToFlip = nb;
  }
  backToPlace(x) {
    this.update(7, 12, true);
    this.x > x ? this.x -= this.speed : this.isStanding = true;
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, this.frame * 28, 219, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  clap() {
    this.isClapping = true;
  }
  stopClap() {
    this.isClapping = false;
  }
  reset() {
    this.goTo = 0;
    this.rowToFlip = undefined;
    this.isMoving = false;
    this.walkingBack = false;
  }
  exit() {
    this.exiting = true;
    console.log("rr");
  }
  draw() {
    if(this.exiting) {
      this.backToPlace(172);
    } else if (this.isClapping) {
      this.clapping();
    } else if (this.isStanding) {
      this.standing();
    } else if (this.goTo != 0) {
      this.walkingToTile(this.goTo)
    } else if (this.walkingBack) {
      this.backToPlace(272);
    } else if (this.rowToFlip != undefined) {
      this.flip();
    } 
  }
  exit() {
    this.exiting = true;
  }
}

export { Vanna };
