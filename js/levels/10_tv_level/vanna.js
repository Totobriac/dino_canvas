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
    this.clap = false;
    this.goTo = 0;
    this.isMoving = false;
    this.rowToFlip;
  }
  update(nb) {
    if (this.tickCount > this.maxTickCount) {
      this.frame < nb ? this.frame++ : this.frame = 0;
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
    this.update(1);
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, this.frame * 28, 0, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  walkingToTile(x) {
    this.update(7);
    this.x < x ? this.x += this.speed : this.goTo = 0;
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, this.frame * 28, 73, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  setGoTo(nb) {
    this.goTo = nb;
    this.isMoving = true;
  }
  flip() {    
    if (this.frame > 1) this.frame = 0;
    this.update(1);
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(ladySprite, this.rowToFlip * 56 + this.frame * 28, 146, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();
  }
  setToFlip(nb) {
    this.rowToFlip = nb;
  }
  draw() {
    if (this.clap) {
      this.clapping();
    } else if (this.goTo != 0) {
      this.walkingToTile(this.goTo)
    } else if (this.rowToFlip != undefined) {
      this.flip();
    } else {
      this.standing();
    }
  }
}

export { Vanna };