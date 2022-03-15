import { map, zelda } from "../script.js";
import { animateFireBall } from "../functions.js";

var zoraSprite = new Image();
zoraSprite.src = "../assets/zeldouille/zora.png";

class Zora {
  constructor(x, y, waterTiles, ctx) {
    this.zoraX = x;
    this.zoraY = y;
    this.waterTiles = waterTiles;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.ringsFrame = 0;
    this.totalCount = 0;
    this.x;
    this.y;
    this.missileTC = 0;
    this.missileDist = 0;
    this.radians;
    this.ctx = ctx;
    this.isFiring = false;
  }
  zoraAnimation() {
    this.totalCount++;
    if (this.tickCount > this.maxTickCount) {
      this.ringsFrame === 0 ? this.ringsFrame = 1 : this.ringsFrame = 0;
      this.tickCount = 0;
    } else {
      this.tickCount++;
    }
    this.ctx.drawImage(zoraSprite, this.ringsFrame * 32, 0, 32, 32, this.zoraX, this.zoraY, 32, 32);

    if (this.totalCount > 200 && this.totalCount < 400) {
      var zoraFace;
      zelda.zoraY > this.zoraY ? zoraFace = 0 : zoraFace = 1;
      this.ctx.drawImage(zoraSprite, 32 * zoraFace, 32, 32, 32, this.zoraX, this.zoraY, 32, 32);
    }

    if (this.totalCount === 300) {
      this.radians = Math.atan2(zelda.y - this.zoraY, zelda.x - this.zoraX);
      this.isFiring = true;
      this.x = this.zoraX;
      this.y = this.zoraY;
    }

    if (this.totalCount > 500) {
      var zoraCoord = this.waterTiles[Math.floor(Math.random() * this.waterTiles.length)];
      this.zoraX = zoraCoord.x;
      this.zoraY = zoraCoord.y;
      this.totalCount = 0;
      this.isFiring = false;
    }

    if (this.isFiring === true) {
      if (this.x > 40 && this.x < 840
        && this.y > 40 && this.y < 328) {
        var x2 = Math.cos(this.radians) * 5;
        var y2 = Math.sin(this.radians) * 5;
        this.x += x2;
        this.y += y2;
        animateFireBall(this.ctx, this.x, this.y);
      }
    }
  }
}

export { Zora };
