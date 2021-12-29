import {
  Sprite
} from "./sprite.js";

var soldier = new Image();
soldier.src = "../assets/sewer_level/soldier_1/still.png";

var walk_0 = new Image();
walk_0.src = "../assets/sewer_level/soldier_1/0.png";
var walk_1 = new Image();
walk_1.src = "../assets/sewer_level/soldier_1/1.png";
var walk_2 = new Image();
walk_2.src = "../assets/sewer_level/soldier_1/2.png";
var walk_3 = new Image();
walk_3.src = "../assets/sewer_level/soldier_1/3.png";

var shoot_0 = new Image();
shoot_0.src = "../assets/sewer_level/soldier_1/shoot_0.png";
var shoot_1 = new Image();
shoot_1.src = "../assets/sewer_level/soldier_1/shoot_1.png";
var shoot_2 = new Image();
shoot_2.src = "../assets/sewer_level/soldier_1/shoot_2.png";

var enemies = [];

class Enemy extends Sprite {
  constructor(x, y, image, player, ctx) {
    super(x, y, image, player, ctx);
    this.speed = 1;
    this.radians;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.frame = 0;
  }
  alert() {
    if (this.distance < 80) {
      this.shoot();
    } else if (this.distance < 200) {
      this.pursue();
    }
  }
  pursue() {
    this.walkAnimation();
    this.radians = Math.atan2(this.player.y - this.y, this.player.x - this.x);
    var x2 = Math.cos(this.radians) * 1.2
    var y2 = Math.sin(this.radians) * 1.2
    this.x += x2;
    this.y += y2;
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
}


function createEnemies(player, ctx) {
  enemies[0] = new Enemy(300, 120, soldier, player, ctx);
}


function drawEnemies() {
  enemies.sort(function(obj1, obj2) {
    return obj2.distance - obj1.distance;
  });
  for (let a = 0; a < enemies.length; a++) {
    //enemies[a].animate();
    enemies[a].draw();
    enemies[a].alert();
  }
}

export {
  createEnemies,
  drawEnemies
}
