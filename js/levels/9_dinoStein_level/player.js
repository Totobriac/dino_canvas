import { normalizeAngle } from "./functions.js";

export class Player {
  constructor(x, y, map, ctx) {
    this.color = "yellow";
    this.x = x;
    this.y = y;
    this.map = map;
    this.ctx = ctx;
    this.angle = 0;
    this.speed = 3;

    this.moveX = 0;
    this.moveY = 0;

    this.rotate = 0;
    this.rotationSpeed = 2 * (Math.PI / 180);
    this.isColliding = false;
    this.FOV = 60;
    this.isMoving = false;
    this.isShooting;
    this.speedTick = 0;
    this.maxTickCount = 4;
    this.chosenWeapon = 0;
    this.discoWeapon = 0;
    this.keys = 0;
    this.life = 100;
  }
  up() {
    this.moveX = 1;
    this.moveY = 1;
    this.isMoving = true;
  }
  down() {
    this.moveX = -1;
    this.moveY = -1;
    this.isMoving = true;
  }
  right() {
    this.rotate = 1;
  }
  left() {
    this.rotate = -1;
  }
  stopMove() {
    this.moveX = 0;
    this.moveY = 0;
    this.isMoving = false;
  }
  stopTurn() {
    this.rotate = 0;
  }
  chooseWeapon(nb) {
    if (nb <= this.discoWeapon) this.chosenWeapon = nb;
  }
  checkForCollision(x, y) {
    var collision = false;
    var xGridNb = Math.floor(x / this.map.mapS);
    var yGridNb = Math.floor(y / this.map.mapS);
   
    if (this.map.checkPlayerCollision(yGridNb, xGridNb)) {
      collision = true;
    };
    return collision;
  } 
  update() {
    var newX = this.x + this.moveX * Math.cos(this.angle) * this.speed;
    var newY = this.y + this.moveY * Math.sin(this.angle) * this.speed;

    this.angle += this.rotate * this.rotationSpeed;
    this.angle = normalizeAngle(this.angle);  

     if (!this.checkForCollision(newX, this.y)) {
      this.x = newX;      
    }

     if (!this.checkForCollision(this.x, newY)) {      
      this.y = newY;
    }
    
    this.checkForItem();
      if (this.map.isSearching === true) this.resetSearch();    
  }
  draw() {
    this.update();
  }
  shoot(nb) {
    this.isShooting = true;
  }
  stopShoot() {
    this.isShooting = false;
  }
  checkForItem() {
    var X = Math.floor(this.x / 64);
    var Y = Math.floor(this.y / 64);

    switch (parseInt(this.map.sprites[Y][X])) {
      case 35:
        if (this.discoWeapon < 1) {
          this.map.removeSprite(35);
          this.discoWeapon = 1;
        }
        break;
      case 29:
        if (this.discoWeapon < 2) {
          this.map.removeSprite(29);
          this.discoWeapon = 2;
        }
        break;
      case 30:
        if (this.discoWeapon < 3) {
          this.map.removeSprite(30);
          this.discoWeapon = 3;
        }
        break;
      case 22:
        if (this.keys < 1) {
          this.map.removeSprite(22);
          this.keys = 1;
        }
        break;
      case 23:
        if (this.keys < 2) {
          this.map.removeSprite(23);
          this.keys = 2;
        }
        break;
    }
  }
  resetSearch() {
    var X = Math.floor(this.x / 64);
    var Y = Math.floor(this.y / 64);
    if (X != this.map.itemTile[0] || Y != this.map.itemTile[1]) {
      this.map.isSearching = false;
    }
  }
}
