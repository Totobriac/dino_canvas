const cactusSprite = new Image();
cactusSprite.src = "../assets/cactus.png";

const cactusArray = [];

class Cactus {
  constructor(gamespeed, ctx) {
    this.x = canvas.width;
    this.width = 80;
    this.height = 80;
    this.y = 290;
    this.gamespeed = gamespeed;
    this.ctx = ctx;
    this.frameIndex = Math.floor(Math.random() * 3);
  }
  draw(ctx) {
    ctx.drawImage(cactusSprite, this.frameIndex * 103, 0, 103, 102, this.x, this.y, this.width, this.height);
  }
  update() {
    this.x -= this.gamespeed;
    this.draw(this.ctx);
  }
}

export function createCactus(frame, gamespeed, ctx) {
  if (frame % 90 === 0) {
    cactusArray.unshift(new Cactus(gamespeed, ctx));
  }

  for (let i = 0; i < cactusArray.length; i++) {
    cactusArray[i].update();
  }
  if (cactusArray.length > 20) {
    cactusArray.pop(cactusArray[0])
  }
}