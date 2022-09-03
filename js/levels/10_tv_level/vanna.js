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
  }
  update(nb) {
    if (this.tickCount > this.maxTickCount) {
      this.frame < nb ? this.frame ++ : this.frame = 0;
      this.tickCount = 0;
    } else {
      this.tickCount ++;
    }
  }  
  standing() {
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;  
    this.ctx.drawImage(ladySprite, 0, 0, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();  
  }
  applauding() {
    if (this.frame > 1) this.frame = 0;
    this.update(1)
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;  
    this.ctx.drawImage(ladySprite, this.frame * 28, 0, 28, 73, this.x, this.y, 84, 219);
    this.ctx.restore();  
  }
}

export { Vanna };