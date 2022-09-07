import { Sprite } from "./sprite.js";
import { getPath } from "./pathFinder.js";
import { distance } from "./functions.js";
import { unlockDoor } from "./init.js";
import { updateKilledBosses } from"./startLevel9.js";


class Enemy extends Sprite {
  constructor(x, y, image, frame, player, still, ctx, map, character, alarmSound, hitSound, shootSound, dieSound,) {
    super(x, y, image, frame, player, still, ctx);
    this.level = map;
    this.angle = 0;
    this.tickCount = 0;
    this.guardPathTickount = 0;
    this.maxTickCount = 12;
    this.isInRange = false;
    this.xFrame = 0;
    this.guardPath = 0;
    this.alerted = false;
    this.path = [];
    this.isFiring;
    this.fireTickCount = 0;
    this.hitTickCount = 0;
    this.isHitten = false;
    this.type = "enemy";
    this.character = character;
    this.sawEnemy = false;
    this.isDead = false;
    this.alarmSound = alarmSound;
    this.hittingSound = hitSound;
    this.shootingSound = shootSound;
    this.dieSound = dieSound;

    this.setStats();
  }
  unclockDoor(){
    if (this.character === "boss1" && this.life <= 0) {
      updateKilledBosses(1);
      unlockDoor(21,25);
    } else if (this.character === "boss2" && this.life <= 0) {
      unlockDoor(19,32);
      updateKilledBosses(2);
    } else if (this.character === "boss3" && this.life <= 0) {
      unlockDoor(16,19);
      updateKilledBosses(3);
    }
  }
  draw() {
    this.angle <= 90 || this.angle >= 270 ? this.Xoffset = 32 : this.Xoffset = -32;
    this.angle < 180 ? this.Yoffset = 32 : this.Yoffset = -32;
    this.update();
    super.draw();
  }
  checkForCollision(x, y) {
    var collision = false;
    var xGridNb = Math.floor((x + this.Xoffset) / this.level.mapS);
    var yGridNb = Math.floor((y + this.Yoffset) / this.level.mapS);
    if (this.level.checkPlayerCollision(yGridNb, xGridNb)) {
      collision = true;
    };
    return collision;
  }
  update() {
    this.unclockDoor();
    this.playXGrid = Math.floor(this.player.x / 64);
    this.playYGrid = Math.floor(this.player.y / 64);
    if (!this.still && !this.alerted) {
      var newX = this.x + Math.cos(this.angle * Math.PI / 180) * this.speed;
      var newY = this.y + Math.sin(this.angle * Math.PI / 180) * this.speed;

      if (!this.checkForCollision(newX, newY)) {
        this.x = newX;
        this.y = newY;
        this.guardPath++;
      } else {
        this.angle += 90;
        if (this.angle < 0) {
          this.angle += 360;
        } else if (this.angle > 360) {
          this.angle -= 360;
        }
        this.guardPath = 0;
      }
    }

    if (this.alerted && !this.isHitten) {
      // il suit le joueur
      this.findPath();

      // si il est plus loin que son champs de tir, il le suit, sinon il tire
      if (this.path.length === 0) {
        this.alerted = false;
        this.isFiring = false;
      } else if (this.path.length > this.fireRange) {

        this.isFiring = false;
        this.stopShootSound();
        var angleSet = false;

        if (this.x - 32 === this.path[1].x * 64) {
          this.x = this.x;
        } else if (this.x - 32 < this.path[1].x * 64) {
          this.x += this.speed;
          if (!angleSet) this.angle = 0, angleSet = true;
        } else if (this.x + 32 > this.path[1].x * 64) {
          this.x -= this.speed;
          if (!angleSet) this.angle = 180, angleSet = true;
        }

        if (this.y - 32 === this.path[1].y * 64) {
          this.y = this.y;
        } else if (this.y - 32 < this.path[1].y * 64) {
          this.y += this.speed;
          if (!angleSet) this.angle = 90, angleSet = true;
        } else if (this.y + 32 > this.path[1].y * 64) {
          this.y -= this.speed;
          if (!angleSet) this.angle = 270, angleSet = true;
        }

      } else {
        this.canBeSeen ? this.isFiring = true : this.isFiring = false;
      }
    }

    // on choisit le sprite en fonction de son angle par rapport au joueur

    var diff = (this.player.angle * 180 / Math.PI) - this.angle;

    if (diff < 0) diff += 360;
    if (diff > 360) diff -= 360;

    if (this.life > 0) {
      switch (true) {
        case diff < 18:
          this.frame = 4
          break;
        case diff > 18 && diff < 67.5:
          this.frame = 3
          break;
        case diff > 67.5 && diff < 112.5:
          this.frame = 2
          break;
        case diff > 112.5 && diff < 157.5:
          this.frame = 1
          break;
        case diff > 157.5 && diff < 202.5:
          this.frame = 0
          break;
        case diff > 202.5 && diff < 247.5:
          this.frame = 7
          break;
        case diff > 247.5 && diff < 292.5:
          this.frame = 6
          break;
        case diff > 292.5 && diff < 337.5:
          this.frame = 5
          break;
        case diff > 342:
          this.frame = 4
          break;
      }
      this.imageX = this.frame * 64;
    }

    if (this.distance && this.distance < 200 && this.life > 0 && !this.alerted ) {
      this.alerted = true
      if (this.path && this.path.length > 0 ) this.shout();
    };


    if (this.life > 0) {
      if ((!this.still || this.alerted) && !this.isFiring && !this.isHitten) {
        if (this.tickCount > this.maxTickCount) {
          this.yFrame < 4 ? this.yFrame++ : this.yFrame = 1;
          this.tickCount = 0;
        } else {
          this.tickCount++;
        }
        this.xFrame = 0;
        this.imageY = this.yFrame * 64;
        this.fireTickCount = 0;
      } else if (this.isFiring) {
        if (!this.sawEnemy) this.shout()
        this.imageY = 6 * 64;
        this.imageX = this.xFrame * 64;
        if (this.fireTickCount > this.maxTickCount * 0.5) {
          this.xFrame < 2 ? this.xFrame++ : this.xFrame = 1;
          this.fireTickCount = 0;
          if (this.sawEnemy && this.xFrame === 1) this.shootSound();
          var rand = Math.floor(Math.random() * 10);
          if (rand > 7) {
            this.player.life -= 2;
          }
        } else {
          this.fireTickCount++;
        }
      }
    } else {
      if (!this.isDead) this.deathShout()
      this.alerted = false;
      this.still = true;
      if (this.hitTickCount < this.maxTickCount / 4) {
        this.hitTickCount++;
      } else {
        if (this.xFrame === 0) this.xFrame = 1;
        this.hitTickCount = 0;
        if (this.xFrame < 4) {
          this.xFrame++;
        }
        this.imageY = 5 * 64;
        this.imageX = this.xFrame * 64;
      }
    }
    if (this.isHitten) {
      this.stopShootSound();
      this.hitSound();
      this.alerted = true;
      alertNme(this.x, this.y, this.level);
      if (this.life > 0) {
        if (this.hitTickCount < this.maxTickCount * 3) {
          this.hitTickCount++;
        } else {
          this.hitTickCount = 0;
          this.isHitten = false;
          this.player.chosenWeapon != 3 ? this.life-- : this.life -= 2;
        }
      }
      this.imageX = 0;
      this.imageY = 5 * 64;
    }
  }
  isHit() {
    switch (true) {
      case this.player.chosenWeapon === 0 && this.distance < 64:
        if (!this.isHitten) this.isHitten = true;
        break;
      case this.player.chosenWeapon === 1 && this.distance < 256:
        if (!this.isHitten) this.isHitten = true;
        break;
      case this.player.chosenWeapon === 2 && this.distance < 512:
        if (!this.isHitten) this.isHitten = true;
        break;
      case this.player.chosenWeapon === 3 && this.distance < 256:
        if (!this.isHitten) this.isHitten = true;
        break;
    }
  }
  findPath() {
    if (this.guardPathTickount > this.maxTickCount) {
      this.guardPathTickount = 0;
      this.path = getPath(this.player, this.level, this.x, this.y);
    } else {
      this.guardPathTickount++;
    }
  }
  setStats() {
    this.yFrame = Math.floor(Math.random() * 4);
    this.maxPath = Math.floor(Math.random() * 8) * 64;
    switch (this.character) {
      case "guard":
        this.fireRange = Math.floor(Math.random() * 2 + 2);
        this.life = 6;
        this.speed = Math.floor(Math.random() * 1) + 2
        break;
      case "officer":
        this.fireRange = Math.floor(Math.random() * 2 + 4);
        this.life = 8;
        this.speed = Math.floor(Math.random() * 2) + 2
        break;
      case "dog":
        this.fireRange = 2;
        this.life = 6;
        this.speed = 4;
        break;
      case "boss1":
        this.type = "boss";
        this.fireRange = Math.floor(Math.random() * 2 + 4);
        this.life = 20;
        this.speed = 4;        
        break;
      case "boss2":
        this.type = "boss";
        this.fireRange = Math.floor(Math.random() * 2 + 4);
        this.life = 25;
        this.speed = 4;
        break;
      case "boss3":
        this.type = "boss";
        this.fireRange = Math.floor(Math.random() * 2 + 2);
        this.life = 30;
        this.speed = 1;
        break;
    }
  }
  shout() {
    this.sawEnemy = true;
    this.alarmSound.play();
  }
  deathShout() {
    this.isDead = true;
    this.dieSound.play();
  }
  hitSound() {
    this.hittingSound.play()
  }
  shootSound() {
    this.shootingSound.play();
  }
  stopShootSound() {
    this.shootingSound.stop();
  }
}
function alertNme(x, y, level) {
  for (let i = 0; i < level.spritesList.length; i++) {
    if (level.spritesList[i] && level.spritesList[i].type === "enemy" && level.spritesList[i].life > 0) {
      var dist = distance(level.spritesList[i].x, level.spritesList[i].y, x, y);
      if (dist < 128) level.spritesList[i].alerted = true;
    }
  }
}

export { Enemy };
