var hudSprite = new Image();
hudSprite.src = "../assets/sewer_level/hud.png";

var gunSprite = new Image();
gunSprite.src = "../assets/sewer_level/gun.png";

var faceSprite = new Image();
faceSprite.src = "../assets/sewer_level/face.png";

class Hud {
  constructor(ctx, player, pistol) {
    this.ctx = ctx;
    this.player = player;
    this.pistol = pistol;
  }
  draw() {
    this.ctx.drawImage(hudSprite, 300, 325);
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Wolf";
    this.ctx.fillText("1", 345, 385);
    this.ctx.fillText("1", 515, 385);
    this.ctx.drawImage(gunSprite, 780,335);
    this.ctx.drawImage(faceSprite, 556,340, 48,52);
    this.update();
  }
  update() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Wolf";
    this.ctx.fillText(this.player.life, 625, 385);
    this.ctx.fillText(this.player.score, 445, 385);
    this.ctx.fillText(this.pistol.ammo, 695, 385);
  }
}

export {Hud}
