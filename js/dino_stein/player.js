import {
  convertToRadians,
  normalizeAngle
} from "./functions.js";
import {
  Ray
} from "./ray.js"

const FOV = 60;

class Player {

  constructor(con, level, x, y) {
    this.ctx = con;
    this.level = level;
    this.x = x;
    this.y = y;

    this.newX = 0;
    this.newY = 0;

    this.move = 0;
    this.turn = 0;
    this.turnAngle = 0;
    this.turnSpeed = convertToRadians(3);
    this.moveSpeed = 3;

    this.numbOfRays = 600;
    this.rays = [];

    var halfFOV = FOV / 2;
    var addedAngle = convertToRadians(FOV / this.numbOfRays);
    var startAngle = convertToRadians(this.turnAngle - halfFOV);
    var angleRay = startAngle;

    for (let i = 0; i < this.numbOfRays; i++) {
      this.rays[i] = new Ray(this.ctx, this.level, this.x, this.y, this.turnAngle, angleRay, i);
      angleRay += addedAngle;
    }
  }
  up() {
    this.move = 1;
  }
  down() {
    this.move = -1;
  }
  right() {
    this.turn = 1;
  }
  left() {
    this.turn = -1;
  }
  stopMoving() {
    this.move = 0;
  }
  stopTuning() {
    this.turn = 0;
  }
  colision(x, y) {

    var hit = false;
    var squareX = parseInt(x / this.level.tileWidth);
    var squareY = parseInt(y / this.level.tileHeight);

    switch (this.level.grid[squareY][squareX]) {
      case 10:
        this.level.levelChange(10);
        this.x = 64;
        this.y = 80;
        this.turnAngle = 1.675;
        break;
      case 11:
        this.level.levelChange(11);
        this.newX = 305;
        this.newY = 220;
        this.turnAngle = 3.14;
        break;
    }

    if (this.level.colision(squareX, squareY))
      hit = true;
    return hit;
  }
  update() {
    this.newX = this.x + this.move * Math.cos(this.turnAngle) * this.moveSpeed;
    this.newY = this.y + this.move * Math.sin(this.turnAngle) * this.moveSpeed;

    if (!this.colision(this.newX, this.newY)) {
      this.x = this.newX;
      this.y = this.newY;
    }
    this.turnAngle += this.turn * this.turnSpeed;
    this.turnAngle = normalizeAngle(this.turnAngle);
    for (let i = 0; i < this.numbOfRays; i++) {
      this.rays[i].x = this.x;
      this.rays[i].y = this.y;
      this.rays[i].setAngle(this.turnAngle);
    }
  }
  draw() {
    console.log(this.turnAngle)
    this.update();
    for (let i = 0; i < this.numbOfRays; i++) {
      this.rays[i].draw();
    }
  }
}

export {
  Player
}
