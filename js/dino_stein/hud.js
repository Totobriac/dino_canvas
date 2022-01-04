var hudSprite = new Image();
hudSprite.src = "../assets/sewer_level/hud.png";

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
