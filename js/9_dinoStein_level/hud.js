var hudSprite = new Image();
hudSprite.src = "./assets/9_dinoStein/hud.png";

var gunSprite = new Image();
gunSprite.src = "./assets/9_dinoStein/gun.png";

var faceSprite = new Image();
faceSprite.src = "./assets/9_dinoStein/face.png";

class Hud {
  constructor(ctx, player, pistol) {
    this.ctx = ctx;
    this.player = player;
    this.pistol = pistol;
    this.faceColumn = 0;
    this.faceLine = 0;
  }
  draw() {
    this.ctx.drawImage(hudSprite, 300, 325);
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Wolf";
    this.ctx.fillText("1", 345, 385);
    this.ctx.fillText("1", 515, 385);
    this.ctx.drawImage(gunSprite, 780, 335);
    this.ctx.drawImage(faceSprite, this.faceColumn * 40, this.faceLine * 46, 40, 46, 556, 340, 48, 52);
    this.update();
  }
  update() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Wolf";
    this.ctx.fillText(this.player.life, 625, 385);
    this.ctx.fillText(this.player.score, 445, 385);
    this.ctx.fillText(this.pistol.ammo, 695, 385);
    this.animateFace();
  }
  animateFace() {
    if (this.player.life > 80) {
      this.faceColumn = 0;
      this.faceLine = 0;
    } else if (this.player.life <= 80 && this.player.life > 50) {
      this.faceColumn = 1;
      this.faceLine = 0;
    } else if (this.player.life <= 50 && this.player.life > 25) {
      this.faceColumn = 0;
      this.faceLine = 1;
    } else if (this.player.life <= 25) {
      this.faceColumn = 1;
      this.faceLine = 1;
    }
  }
}


export {
  Hud
}
