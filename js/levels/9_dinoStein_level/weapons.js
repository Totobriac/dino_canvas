import { soundPlayer } from "./startLevel9.js";

var pistolSprite = new Image();
pistolSprite.src = "./assets/9_dinoStein/pistol.png";

var up = true;

class Weapon {
  constructor(ctx, player, map) {
    this.ctx = ctx;
    this.tickCount = 0;
    this.gunTickCount = 0;
    this.yMove = 0;
    this.yTick = 0;
    this.player = player;
    this.xFrame = 0;
    this.yOffset = 0;
    this.oldWeapon = 0;
    this.sprites = map.spritesList;
  }
  draw() {
    if (this.player.isMoving) {
      if (this.tickCount < 8) {
        this.tickCount++
      } else {
        this.setYMove();
        this.tickCount = 0;
      }
      this.yTick > 200 ? this.yTick = 0 : this.yTick++;
    }
    if (this.player.isShooting) {
      this.shoot();
    }

    if (this.oldWeapon != this.player.chosenWeapon) {
      this.upDown();
      if (up) {
        this.ctx.drawImage(pistolSprite, 64 * this.xFrame, this.oldWeapon * 64 + 20, 64, 44, 440, 184 + this.yMove * 4 + this.yOffset, 320, 220);
      } else {
        this.ctx.drawImage(pistolSprite, 64 * this.xFrame, this.player.chosenWeapon * 64 + 20, 64, 44, 440, 184 + this.yMove * 4 + this.yOffset, 320, 220);
      }
    } else {
      this.ctx.drawImage(pistolSprite, 64 * this.xFrame, this.player.chosenWeapon * 64 + 20, 64, 44, 440, 184 + this.yMove * 4 + this.yOffset, 320, 220);
    }
  }
  upDown() {
    if (up) {
      this.yOffset < 86 ? this.yOffset += 5 : up = false;
    } else {
      if (this.yOffset > 0) {
        this.yOffset -= 5;
      } else {
        up = true;
        this.oldWeapon = this.player.chosenWeapon;
      }
    }
  }
  shoot() {
    switch (this.player.chosenWeapon) {
      case 0:
        soundPlayer.knife();
        break;
      case 1:
        soundPlayer.pistol();
        break;
      case 2:
        soundPlayer.machineGun();
        break;
      case 3:
        soundPlayer.gatlingGun();
        break;
    }

    this.gunTickCount++;
    if (this.gunTickCount % 6 === 0) {
      if (this.xFrame < 4) {
        this.xFrame++;
      } else {
        this.player.stopShoot();
        this.gunTickCount = 0;
        this.xFrame = 0;
      }
    }

    for (let i = this.sprites.length - 2; i >= 0; i--) {
      if (this.sprites[i].type === "enemy" && this.sprites[i].life > 0) {
        if (this.sprites[i].screenX - this.sprites[i].spriteWidth / 4 <= 300 && this.sprites[i].screenX + this.sprites[i].spriteWidth / 4 >= 300) {
          this.sprites[i].isHit();
          return
        }
      } else if (this.sprites[i].type === "boss" && this.sprites[i].life > 0) {

        if (this.sprites[i].screenX - this.sprites[i].spriteWidth / 2 <= 300 && this.sprites[i].screenX + this.sprites[i].spriteWidth / 2 >= 300) {
          console.log(this.sprites[i].screenX - this.sprites[i].spriteWidth / 2 );
          this.sprites[i].isHit();
          return
        }
      }
    }
  }
  setYMove() {
    this.yMove = Math.cos(this.yTick);
  }
}

export { Weapon };
