import { convertToRadians, distBetweenTwoPoints } from "./functions.js";
import { zBuffer } from "./raycasting.js";

import { player, ctx } from "./raycasting.js";


var items = new Image();
items.src = "./assets/sewer_level/items.png";

var soldier_1 = new Image();
soldier_1.src = "./assets/sewer_level/soldier_1/die_4.png";
var boss = new Image();
boss.src = "./assets/sewer_level/boss/die_4.png";
var dog = new Image();
dog.src = "./assets/sewer_level/dog/die_4.png";

const FOV = 60;
const half_FOV = convertToRadians(FOV / 2);
var canvasWidth = 600;
var canvasHeight = 400;

var sprites = [];

class Sprite {
  constructor(x, y, image, frame, player, ctx) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.frame = frame;
    this.imageX;
    this.imageY;
    this.player = player;
    this.distance = 0;
    this.angle = 0;
    this.visible = false;
    this.ctx = ctx;
    this.halfSprite = 0; 
    this.getImageXY(this.frame);
  }
  getImageXY() {
    var line = Math.floor(this.frame / 4);
    this.imageY = line * 64;
    this.imageX = (this.frame - (line * 4)) * 64;
  }
  calculateAngle() {
    var vectX = this.x - this.player.x;
    var vectY = this.y - this.player.y;
    var objectPlayerAngle = Math.atan2(vectY, vectX);
    var angleDif = this.player.turnAngle - objectPlayerAngle;
    if (angleDif < -3.14159)
      angleDif += 2.0 * 3.14159;
    if (angleDif > 3.14159)
      angleDif -= 2.0 * 3.14159;
    angleDif = Math.abs(angleDif);
    if (angleDif < half_FOV)
      this.visible = true;
    else
      this.visible = false;
    return angleDif
  }
  calculateDistance() {
    this.distance = distBetweenTwoPoints(this.player.x, this.player.y, this.x, this.y);
  }
  update() {
    this.calculateAngle();
    this.calculateDistance();
  }
  draw() {
    this.update();
    if (this.visible == true) {
      var tileHeightile = 400;
      var projectPlaneDist = (canvasWidth / 2) / Math.tan(FOV / 2);
      var spriteHeight = (tileHeightile / this.distance) * projectPlaneDist;
      var y0 = parseInt(canvasHeight / 2) - parseInt(spriteHeight / 2);
      var y1 = y0 + spriteHeight;
      var heightTileTexture = 64;
      var widthTileTexture = 64;
      var textureHeight = y0 - y1;
      var dx = this.x - this.player.x;
      var dy = this.y - this.player.y;
      var spriteAngle = Math.atan2(dy, dx) - this.player.turnAngle;
      var viewDist = 500;
      var x0 = Math.tan(spriteAngle) * viewDist;
      var x = (canvasWidth / 2 + x0 - textureHeight / 2);
      this.ctx.imageSmoothingEnabled = false;
      var columnWidth = textureHeight / heightTileTexture;

      for (let i = 0; i < widthTileTexture; i++) {
        for (let j = 0; j < columnWidth; j++) {
          if (i === 32) {
            this.halfSprite = x1 + 300;
          }
          var x1 = parseInt(x + ((i - 1) * columnWidth) + j);
          if (zBuffer[x1] > this.distance) {
            this.ctx.drawImage(this.image, i + this.imageX, this.imageY, 1, heightTileTexture - 1, x1 + 300, y1, 1, textureHeight);
          }
        }
      }
    }
  }
}

function createSprites(spriteList) {
  for (let i = 0; i < spriteList.length; i++) {
    sprites[i] = new Sprite(spriteList[i][0], spriteList[i][1], eval(spriteList[i][3]), spriteList[i][2], player, ctx);
  }
}

function removeSprites() {
  sprites = [];
}

function drawSprites() {
  sprites.sort(function (obj1, obj2) {
    return obj2.distance - obj1.distance;
  });
  for (let a = 0; a < sprites.length; a++) {
    sprites[a].draw();
  }
}

export { createSprites, drawSprites, Sprite, removeSprites }
