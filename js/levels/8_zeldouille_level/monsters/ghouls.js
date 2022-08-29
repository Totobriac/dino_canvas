import { collChecker } from "../functions.js";
import { map } from "../script.js";
import { setPotionXY } from "../itemsPng.js";
import { zelda } from "../script.js";
import { playSound } from "../music.js";

var dyingEffect = new Image();
dyingEffect.src = "./assets/8_zeldouille/effects.png";

export class Monster {
  constructor(map, bundaries, ctx, speed) {
    this.x = (Math.floor(Math.random() * 24) + 2) * 32 + 8;
    this.y = (Math.floor(Math.random() * 10) + 1) * 32 + 8;
    this.map = map;
    this.ctx = ctx;
    this.direction = Math.floor(Math.random() * 4);
    this.index = this.getIndex();
    this.isColliding = false;
    this.isExiting = false;
    this.bundaries = bundaries;
    this.maxDist = 64;
    this.dist = 0;
    this.hasAppeard = false;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.frame = 0;
    this.misileCount = 0;
    this.reload = 200;
    this.speed = speed;
    this.isDead = false;
    this.dyingTick = 0;
    this.dyingFrame = 0;
  }
  randomDirection() {
    this.direction = Math.floor(Math.random() * 4);
  }
  getIndex() {
    return Math.floor((this.y - 8) / 32) * 28 + Math.floor((this.x - 8) / 32);
  }
  move() {
    if (!this.isColliding) {

      if (this.dist > this.maxDist) {
        this.randomDirection();
        this.dist = 0;
      }
      if (this.direction === 0) {
        var nextX = this.x + this.speed;
        this.checkBundaries(nextX, this.y) === false && this.checkCollision(nextX, this.y).isColliding === false
          ? this.x += this.speed
          : this.randomDirection();
      }
      else if (this.direction === 1) {
        var nextX = this.x - this.speed;
        this.checkBundaries(nextX, this.y) === false && this.checkCollision(nextX, this.y).isColliding === false
          ? this.x -= this.speed
          : this.randomDirection();
      }
      else if (this.direction === 2) {
        var nextY = this.y + this.speed;
        this.checkBundaries(this.x, nextY) === false && this.checkCollision(this.x, nextY).isColliding === false
          ? this.y += this.speed
          : this.randomDirection();
      }
      else if (this.direction === 3) {
        var nextY = this.y - this.speed;
        this.checkBundaries(this.x, nextY) === false && this.checkCollision(this.x, nextY).isColliding === false
          ? this.y -= this.speed
          : this.randomDirection();
      }
      this.dist += this.speed;
    }
    else {
      this.randomDirection();
      this.isColliding = false;
    }

  }
  checkCollision(x, y) {
    return collChecker(x, y, map.obstacles);
  }
  checkBundaries(x, y) {
    if (x >= this.bundaries[0] * 32 + 8 &&
      x <= (27 - this.bundaries[1]) * 32 + 8 &&
      y >= this.bundaries[2] * 32 + 8 &&
      y <= (11 - this.bundaries[3]) * 32 + 8
    ) {
      return false
    }
    else {
      return true
    }
  }
  checkShot() {
    var dir = [];
    if (this.direction === 0) {
      dir = [1, 0];
    } else if (this.direction === 1) {
      dir = [-1, 0];
    } else if (this.direction === 2) {
      dir = [0, 1];
    } else if (this.direction === 3) {
      dir = [0, -1];
    }
    for (let i = 0; i < 180; i++) {
      var shot = collChecker(this.x + dir[0] * i, this.y + dir[1] * i, map.obstacles);
      if (shot.isColliding === true) return false;
    }
    return true;
  }
}

class Missile {
  constructor(x, y, direction, speed, maxDist, sprite, isPiercing) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.maxDist = maxDist;
    this.dist = 0;
    this.sprite = sprite;
    this.isIntercepted = false;
    this.interceptionTick = 0;
    this.maxTickCount = 8;
    this.isPiercing = isPiercing;
  }
  fly() {
    if (this.direction === 0) {
      this.x += this.speed;
    } else if (this.direction === 1) {
      this.x -= this.speed;
    } else if (this.direction === 2) {
      this.y += this.speed;
    } else if (this.direction === 3) {
      this.y -= this.speed;
    }
    this.dist += this.speed;
  }
}

function monsterAnimation(ctx) {

  if (map.zora) {
    map.zora.zoraAnimation();
  }

  if(map.actual === 10) {
    map.ganon.ganonAnimation();
  }

  if (map.monsters) {
    var monstersIndexList = [];

    for (let i = 0; i < map.monsters.length; i++) {
      map.monsters[i].misileCount++;
      map.monsters[i].tickCount++;


      if (map.monsters[i].hasAppeard === false) {
        if (map.monsters[i].tickCount < map.monsters[i].maxTickCount) {
          ctx.drawImage(map.monsters[i].sprite, 0, 128, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
        }
        else if (map.monsters[i].tickCount >= map.monsters[i].maxTickCount && map.monsters[i].tickCount < 2 * map.monsters[i].maxTickCount) {
          ctx.drawImage(map.monsters[i].sprite, 32, 128, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
        }
        else {
          map.monsters[i].hasAppeard = true;
        }
      }
      else if(map.monsters[i].hasAppeard === true && map.monsters[i].isDead === false) {
        if (map.monsters[i].tickCount > map.monsters[i].maxTickCount) {
          map.monsters[i].frame === 0 ? map.monsters[i].frame = 1 : map.monsters[i].frame = 0;
          map.monsters[i].tickCount = 0;
        }
        ctx.drawImage(map.monsters[i].sprite, map.monsters[i].frame * 32, map.monsters[i].direction * 32, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
        monstersIndexList.push(map.monsters[i].index);
        map.monsters[i].move();
      }
      else {
        if (map.monsters[i].dyingTick < map.monsters[i].maxTickCount * 2) {
          map.monsters[i].dyingFrame ++;
          map.monsters[i].dyingTick = 0;
        }
        if (map.monsters[i].dyingFrame === 5) {
          playSound(7);
          if (!zelda.hasPotion) setPotionXY(map.monsters[i].x + 10, map.monsters[i].y + 4 );
          map.monsters.splice(i, 1);
          return
        }
        else {
          map.monsters[i].dyingTick ++;
        }
        ctx.drawImage(dyingEffect, map.monsters[i].dyingFrame * 32, 0, 32,32, map.monsters[i].x, map.monsters[i].y, 32, 32);
      }

      if (map.monsters[i].checkShot() === true &&
        map.monsters[i].misileCount > map.monsters[i].reload) {
        map.monsters[i].misileCount = 0;
        var missile = new Missile(map.monsters[i].x, map.monsters[i].y,
                                  map.monsters[i].direction, map.monsters[i].speed * 2,
                                  280, map.monsters[i].sprite, map.monsters[i].isPiercing );
        map.missiles.push(missile)
      };
    }

    for (let i = 0; i < map.missiles.length; i++) {

      if (map.missiles[i].isIntercepted === false ) map.missiles[i].fly();

      if (map.missiles[i].dist < map.missiles[i].maxDist) {
        var dir = [];
        if (map.missiles[i].direction === 0) {
          dir = [0, 160];
        } else if (map.missiles[i].direction === 1) {
          dir = [32, 160];
        } else if (map.missiles[i].direction === 2) {
          dir = [32, 192];
        } else if (map.missiles[i].direction === 3) {
          dir = [0, 192];
        }
        if (map.missiles[i].x > 0 && map.missiles[i].x < 888
          && map.missiles[i].y > 0 && map.missiles[i].y < 376
          && map.missiles[i].isIntercepted === false ) {
          ctx.drawImage(map.missiles[i].sprite, dir[0], dir[1], 32, 32, map.missiles[i].x, map.missiles[i].y, 32, 32);
        }
        if (map.missiles[i].isIntercepted === true) {
          if (map.missiles[i].interceptionTick < map.missiles[i].maxTickCount) {
            map.missiles[i].interceptionTick ++;
            ctx.drawImage(dyingEffect, 256,0,32,32, map.missiles[i].x, map.missiles[i].y, 32,32)
          }
          else {
            map.missiles.splice(i, 1);
          }
        }
      }
      else {
        map.missiles.splice(i, 1);
      }
    }
  }
}

function monsterMayem() {
  map.monsters = [];
  map.missiles = [];
  map.zora = undefined;
}


export { monsterAnimation, monsterMayem };
