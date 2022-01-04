var pistol = new Image();
pistol.src = "../assets/sewer_level/pistol.png";

class Pistol {
  constructor(ctx) {
    this.ctx = ctx;
    this.isShooting = false;
    this.tickCount = 0;
    this.maxTickCount = 8;
    this.frame = 0;
    this.frames = 4;
    this.ammo = 666;
  }
  draw() {
    if (this.isShooting === false) {
      this.ctx.drawImage(pistol, 0, 0, 64, 64, 450, 8, 320, 320);
    } else {
      this.tickCount++;
      if (this.tickCount > this.maxTickCount) {
        this.tickCount = 0;
        if (this.frame < this.frames) {
          this.frame++
        } else {
          this.ammo --;
          this.isShooting = false;
          this.frame = 0;
        }
      }
      this.ctx.fillStyle="black"
      this.ctx.drawImage(pistol, this.frame * 64, 0, 64, 64, 450, 8, 320, 320);
    }
  }
  shoot() {
    this.isShooting = true;
  }
}

export {
  Pistol
};
