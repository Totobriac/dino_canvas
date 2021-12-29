import {
  Sprite
} from "./sprite.js";

var enemies = [];

class Enemy extends Sprite {
  constructor(x, y, image, player, ctx) {
    super(x, y, image, player, ctx);
    this.speed = 1;
  }
  alert() {
    if (this.distance < 100) {
      console.log("fire")
    } else if (this.distance < 200) {
      this.pursue(this.calculateAngle())
    }
  }
  pursue(angle) {
    this.x += this.speed;
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
