import {
  Sprite
} from "./sprite.js";

var type = "soldier_1";

var soldier = new Image();
soldier.src = "../assets/sewer_level/" + type + "/still.png";

var walk_0 = new Image();
walk_0.src = "../assets/sewer_level/" + type + "/0.png";
var walk_1 = new Image();
walk_1.src = "../assets/sewer_level/" + type + "/1.png";
var walk_2 = new Image();
walk_2.src = "../assets/sewer_level/" + type + "/2.png";
var walk_3 = new Image();
walk_3.src = "../assets/sewer_level/" + type + "/3.png";

var shoot_0 = new Image();
shoot_0.src = "../assets/sewer_level/" + type + "/shoot_0.png";
var shoot_1 = new Image();
shoot_1.src = "../assets/sewer_level/" + type + "/shoot_1.png";
var shoot_2 = new Image();
shoot_2.src = "../assets/sewer_level/" + type + "/shoot_2.png";

var die_0 = new Image();
die_0.src = "../assets/sewer_level/" + type + "/die_0.png";
var die_1 = new Image();
die_1.src = "../assets/sewer_level/" + type + "/die_1.png";
var die_2 = new Image();
die_2.src = "../assets/sewer_level/" + type + "/die_2.png";
var die_3 = new Image();
die_3.src = "../assets/sewer_level/" + type + "/die_3.png";
var die_4 = new Image();
die_4.src = "../assets/sewer_level/" + type + "/die_4.png";

var enemies = [];

class Enemy extends Sprite {
  constructor(x, y, image, player, ctx, level, pistol) {
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
    //this.type = type;
    this.init();
  }
  init() {
    type = "boss";
  }
  alert() {
    if (this.distance < 80) {
      this.shoot();
    } else if (this.distance < 160) {
      this.pursue();
    } else {
      this.image = soldier;
      this.frame = 0;
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
      this.image = soldier;
      this.frame = 0;
    }
  }
  walkAnimation() {
    this.tickCount++;
    if (this.tickCount > this.maxTickCount) {
      this.tickCount = 0;
      this.frame < 3 ? this.frame++ : this.frame = 0;
    }
    var pic = "walk_" + this.frame;
    this.image = eval(pic);
  }
  shoot() {
    if (this.frame > 2) this.frame = 0;
    this.tickCount++;
    if (this.tickCount > this.maxTickCount) {
      this.tickCount = 0;
      this.frame < 2 ? this.frame++ : this.frame = 0;
    }
    var pic = "shoot_" + this.frame;
    this.image = eval(pic);
  }
  isDying() {
    this.tickCount++;
    if (this.tickCount > this.maxTickCount) {
      this.tickCount = 0;
      if (this.frame < 4 ) this.frame++;
    }
    var pic = "die_" + this.frame;
    this.image = eval(pic);
  }
  checkIfInRange() {
    if (this.halfSprite + 20 < 592 || this.halfSprite > 638) {
      this.isInRange = false;
    } else {
      this.isInRange = true;
    }
    if (this.isInRange === true && this.pistol.isShooting === true) {
      this.isShot = true;
      this.isDying();
    }
  }
}

function createEnemies(player, ctx, level, pistol) {
  enemies[0] = new Enemy(300, 120, soldier, player, ctx, level,pistol);
}

function drawEnemies() {
  enemies.sort(function(obj1, obj2) {
    return obj2.distance - obj1.distance;
  });
  for (let a = 0; a < enemies.length; a++) {
    enemies[a].checkIfInRange();
    enemies[a].draw();
    if (enemies[a].isShot === false) {
      enemies[a].alert();
    } else {
      enemies[a].isDying();
    }
  }
}

export {
  createEnemies,
  drawEnemies
}
