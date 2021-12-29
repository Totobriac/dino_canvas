import {
  Sprite
} from "./sprite.js";

var enemies = [];

class Enemy extends Sprite {
  constructor(x, y, image, player, ctx) {
    super(x, y, image, player, ctx);
    this.speed = 1;
    this.radians;
  }
  alert() {
    if (this.distance < 100) {
      console.log("fire")
    } else if (this.distance < 200) {
      this.pursue()
    }
  }
  pursue() {
    this.radians = Math.atan2(this.player.y - this.y, this.player.x - this.x);
    var x2 = Math.cos(this.radians) * 1;
    var y2 = Math.sin(this.radians) * 1;
    this.x += x2;
    this.y += y2;
  }
}


function createEnemies(player, ctx) {
  var soldier = new Image();
  soldier.src = "../assets/sewer_level/soldier_1.png";

  enemies[0] = new Enemy(300, 120, soldier, player, ctx);

}


function drawEnemies() {
  enemies.sort(function(obj1, obj2) {
    return obj2.distance - obj1.distance;
  });
  for (let a = 0; a < enemies.length; a++) {
    enemies[a].draw();
    enemies[a].alert();
  }
}

export {
  createEnemies,
  drawEnemies
}
