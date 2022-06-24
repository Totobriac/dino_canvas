import { zelda } from "../script.js";
import { animateFireBall } from "../functions.js";
import { openGannonCave } from "../maps.js";
import { playSound } from "../music.js";

var gannonSprite = new Image();
gannonSprite.src = "../assets/8_zeldouille/gannon_with_explosion.png";

class Ganon {
  constructor(ctx) {
    this.gannonX = 400;
    this.gannonY = 160;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.ctx = ctx;
    this.x;
    this.y;
    this.radians;
    this.isFiring = false;
    this.isVisible = false;
    this.life = 1;
    this.hasAppeard = false;
    this.dyingTickCount = 0;
    this.frame;
  }
  spawn() {
    this.gannonX = 264 + Math.floor(Math.random() * 320);
    this.gannonY = 104 + Math.floor(Math.random() * 160);
  }
  gannonAnimation() {
    if (this.hasAppeard === false) {
      this.tickCount++;
      if (this.tickCount < 40) {
        this.isVisible = true;
      }
      else {
        this.isVisible = false;
        this.hasAppeard = true;
        this.tickCount = 0;
      }
    }
    if (this.hasAppeard === true) {
      if (this.life > 0) {
        if (this.tickCount > this.maxTickCount * 45) {
          this.spawn();
          this.tickCount = 0;
          this.isFiring = false;
          this.isVisible = false;
        }
        else {
          this.tickCount++;
        }
        if (this.tickCount === 200) {
          this.radians = Math.atan2(zelda.y - this.gannonY, zelda.x - this.gannonX);
          this.isFiring = true;
          this.x = this.gannonX;
          this.y = this.gannonY;
          playSound(12);
        }
        if (this.isFiring === true) {
          if (this.x > 264 && this.x < 648 &&
            this.y > 104 && this.y < 368) {
            var x2 = Math.cos(this.radians) * 5;
            var y2 = Math.sin(this.radians) * 5;
            this.x += x2;
            this.y += y2;
            animateFireBall(this.ctx, this.x, this.y);
          }
        }
      }
      else {
        this.gannonDying();
        openGannonCave();
      }
      if (this.isVisible === true) {
        if (this.life > 0) this.frame = this.life;
        var line = Math.floor(this.frame / 2);
        var column = this.frame - line * 2;
        this.ctx.drawImage(gannonSprite, column * 64, line * 64, 64, 64, this.gannonX, this.gannonY, 64, 64);
      }
    }
  }
  gannonDying() {
    this.isVisible === true
    this.dyingTickCount++;
    if (this.dyingTickCount === 1) playSound(11);
    if (this.dyingTickCount < 150) {
      if (this.tickCount > this.maxTickCount * 0.5) {
        this.frame === 0 ? this.frame = 5 : this.frame = 0;
        this.tickCount = 0;
      }
      else {
        this.tickCount++;
      }
    }
    else if (this.dyingTickCount >= 150 && this.dyingTickCount < 250) {
      if (this.tickCount > this.maxTickCount * 0.5) {
        this.frame === 7 ? this.frame = 8 : this.frame = 7;
        this.tickCount = 0;
      }
      else {
        this.tickCount++;
      }
    }
    else {
      if (this.dyingTickCount === 251) playSound(14);
      this.frame = 9;
      if (!zelda.hasKey) {
        this.ctx.drawImage(gannonSprite, 0, 320, 64, 64, this.gannonX, this.gannonY, 64, 64);
        this.grabKey();
      }
    }
  }
  grabKey() {
    if (zelda.x + 32 < this.gannonX || zelda.x > this.gannonX + 64 ||
      zelda.y + 32 < this.gannonY || zelda.y > this.gannonY + 64) {
      zelda.hasKey = false;
    }
    else {
      if (!zelda.hasKey) playSound(9);
      zelda.hasKey = true;      
    }
  }
}


export { Ganon };
