import {
  Sprite
} from "./sprite.js";

import {
  player,
  ctx,
  level,
  pistol
} from "./raycasting.js";

var soldier = new Image();
soldier.src = "../assets/sewer_level/soldier_1/still.png";

var enemies = [];

class Enemy extends Sprite {
  constructor(x, y, image, player, ctx, level, pistol, type) {
    super(x, y, image, player, ctx);
    this.level = level;
    this.speed = 1;
    this.radians;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.frame = 0;
    this.isInRange = false;
    this.isShot = false;
    this.pistol = pistol;
    this.type = type;
    this.life = 5;
    this.lifeCounter = true;
    this.dies = false;
    this.isDead = false;
    this.isSpriteRemoved = false;

    this.soldier = new Image();
    this.soldier.src = "../assets/sewer_level/" + this.type + "/still.png";

    this.walk_0 = new Image();
    this.walk_0.src = "../assets/sewer_level/" + this.type + "/0.png";
    this.walk_1 = new Image();
    this.walk_1.src = "../assets/sewer_level/" + this.type + "/1.png";
    this.walk_2 = new Image();
    this.walk_2.src = "../assets/sewer_level/" + this.type + "/2.png";
    this.walk_3 = new Image();
    this.walk_3.src = "../assets/sewer_level/" + this.type + "/3.png";

    this.shoot_0 = new Image();
    this.shoot_0.src = "../assets/sewer_level/" + this.type + "/shoot_0.png";
    this.shoot_1 = new Image();
    this.shoot_1.src = "../assets/sewer_level/" + this.type + "/shoot_1.png";
    this.shoot_2 = new Image();
    this.shoot_2.src = "../assets/sewer_level/" + this.type + "/shoot_2.png";

    this.die_0 = new Image();
    this.die_0.src = "../assets/sewer_level/" + this.type + "/die_0.png";
    this.die_1 = new Image();
    this.die_1.src = "../assets/sewer_level/" + this.type + "/die_1.png";
    this.die_2 = new Image();
    this.die_2.src = "../assets/sewer_level/" + this.type + "/die_2.png";
    this.die_3 = new Image();
    this.die_3.src = "../assets/sewer_level/" + this.type + "/die_3.png";
    this.die_4 = new Image();
    this.die_4.src = "../assets/sewer_level/" + this.type + "/die_4.png";

    this.hurt = new Image();
    this.hurt.src = "../assets/sewer_level/" + this.type + "/die_0.png";
  }

  alert() {
    if (this.dies === false) {
      if (this.distance < 50) {
        this.shoot();
      } else if (this.distance < 150) {
        this.pursue();
      } else {
        this.image = this.soldier;
        this.frame = 0;
      }
    } else {
      this.tickCount++;
      if (this.tickCount > this.maxTickCount) {
        this.dies = false;
        this.tickCount = 0;
      }
      this.life > 0 ? this.bleeding() : this.isDying();
    }
  }
  pursue() {
    this.walkAnimation();
    this.radians = Math.atan2(this.player.y - this.y, this.player.x - this.x);
    var X = this.x;
    var Y = this.y;

    var nextX = X += Math.cos(this.radians) * 1.2;
    var nextY = Y += Math.sin(this.radians) * 1.2;

    var squareX = parseInt(nextX / this.level.tileWidth);
    var squareY = parseInt(nextY / this.level.tileHeight);

    var noCollision = this.level.colision(squareX, squareY);
    if (noCollision === false) {
      this.x = nextX;
      this.y = nextY;
    } else {
      this.image = this.soldier;
      this.frame = 0;
    }
  }
  walkAnimation() {
    this.tickCount++;
    if (this.tickCount > this.maxTickCount) {
      this.tickCount = 0;
      this.frame < 3 ? this.frame++ : this.frame = 0;
    }
    var pic = "this.walk_" + this.frame;
    this.image = eval(pic);
  }
  shoot() {
    if (this.frame > 2) this.frame = 0;
    this.tickCount++;
    if (this.tickCount > this.maxTickCount) {
      this.tickCount = 0;
      if (this.frame < 2) {
        this.frame++
      } else {
        this.player.life -= 5;
        this.ctx.fillStyle = "red";
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillRect(300, 0, 600, 325);
        this.ctx.globalAlpha = 1;
        this.frame = 0;
      }
    }
    var pic = "this.shoot_" + this.frame;
    this.image = eval(pic);
  }
  isDying() {
    this.dies = true;
    this.tickCount++;
    if (this.tickCount > this.maxTickCount) {
      this.tickCount = 0;
      if (this.frame === 1) this.player.score += 50;
      if (this.frame < 4) this.frame++;
    }
    var pic = "this.die_" + this.frame;
    this.image = eval(pic);
    this.isDead = true;
  }
  bleeding() {
    this.image = this.hurt;
  }
  checkIfInRange() {
    if (this.halfSprite + 20 < 592 || this.halfSprite > 638) {
      this.isInRange = false;
    } else {
      this.isInRange = true;
    }
    if (this.isInRange === true && this.pistol.isShooting === true && this.lifeCounter === true) {
      this.lifeCounter = false;
      this.life--;
      this.dies = true;
    }
    if (this.pistol.isShooting === false) {
      this.lifeCounter = true;
    }
  }
  removeSprite(index, enemy) {
    this.isSpriteRemoved = true;
    this.level.level.sprites.push([enemy.x, enemy.y, enemy.type]);
    this.level.level.enemies.splice(index, 1);
  }
}

function createEnemies(enemyList) {
  for (let i = 0; i < enemyList.length; i++) {
    enemies[i] = new Enemy(enemyList[i][0], enemyList[i][1], soldier, player, ctx, level, pistol, enemyList[i][2]);
  }
}

function removeEnemies() {
  enemies = [];
}

function drawEnemies() {
  enemies.sort(function (obj1, obj2) {
    return obj2.distance - obj1.distance;
  });
  for (let a = 0; a < enemies.length; a++) {
    enemies[a].alert();
    enemies[a].checkIfInRange();
    enemies[a].draw();
    if (enemies[a].isDead === true && enemies[a].isSpriteRemoved === false) enemies[a].removeSprite(a, enemies[a]);
  }
}

export {
  createEnemies,
  drawEnemies,
  removeEnemies,
}
