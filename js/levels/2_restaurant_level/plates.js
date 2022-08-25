import { note } from "./notepad.js";
import { newHeight, winHeight } from "./startLevel2.js";
import { left, top } from "../../script.js";

var food = new Image();
food.src = "./assets/2_restaurant/food.png";

var explosionSprite = new Image();
explosionSprite.src = "./assets/2_restaurant/dish_explosion.png";

var platesArray = [];
var brokenPlates = [];
var explosions = [];

var servedDish;

var canCollide = true;

class Explosion {
  constructor(x, ctx) {
    this.x = x;
    this.ctx = ctx;
    this.sprite = explosionSprite;
    this.width = 120;
    this.height = 120;
    this.coef = 0.8;
    this.y = winHeight - ((this.height * this.coef) / 2);
    this.tickCount = 0;
    this.maxTickCount = 9;
    this.frame = 0;
    this.maxFrame = 8;
    this.originX = 0;
    this.originY = 0;
  }
  update() {
    if (this.tickCount < this.maxTickCount) {
      this.tickCount++
    } else {
      this.tickCount = 0;
      if (this.frame < this.maxFrame) this.frame++
    }
    var line = Math.floor(this.frame / 3);
    var column = this.frame - (Math.floor(this.frame / 3) * 3);
    this.originX = line * 120;
    this.originY = column * 120;
  }
  draw() {
    this.update();
    this.ctx.drawImage(this.sprite, this.originX, this.originY, this.width, this.height, this.x, this.y, this.width * this.coef, this.height * this.coef)
  }
}

class Plates {
  constructor(ctx) {
    this.x = 100 + Math.random() * 700 + left;
    this.y = -60 + top;
    this.vy = 0.4;
    this.acc = 0;
    this.ctx = ctx;
    this.height = 67;
    this.width = 70;
    this.variety = Math.floor(Math.random() * 16);
    this.hasCollided = false;
  }
  draw() {
    this.ctx.drawImage(food, this.variety * 94 + 94, 0, 94, 100, this.x, this.y, this.height, this.width)
  }
  update(dino, i) {
    if (this.y < newHeight - 67 + top) {
      this.acc += 0.02;
      this.y += (this.vy + this.acc);
    } else {
      platesArray.splice(i, 1);
      i--;
      var angle = -20 + Math.floor(Math.random() * 40);
      brokenPlates.push({ variety: this.variety, x: this.x, angle: angle });
      explosions.push(new Explosion(this.x, this.ctx));
    }
    if (checkCollision(this.x, this.y, dino) && canCollide) {
      platesArray.splice(i, 1);
      i--;
      this.hasCollided = true;
      servedDish = this.variety;
      var isServed = note.checkIfServed(servedDish);
      isServed ? note.updateNote(1) : note.updateNote(-1);
      canCollide = false;
      setTimeout(() => canCollide = true, 300);
    }
    if (!this.hasCollided) this.draw();
  }
}

export function generatePlates(ctx, frame, dino) {
  if (frame % 40 === 0) {
    platesArray.unshift(new Plates(ctx));
  }
  for (let i = 0; i < platesArray.length; i++) {
    platesArray[i].update(dino, i);
  }
}

export function drawTrash(ctx) {
  if (brokenPlates.length > 0) {
    brokenPlates.forEach(plate => {
      drawBroken(plate, ctx);
    })
  }
  if (brokenPlates.length > 80) {
    brokenPlates.pop(brokenPlates[0])
  }
  explosions.forEach((explosion, i) => {
    if(explosion.frame === 8) {
      explosions.slice(i,1);
      i --;
    } else {
      explosion.draw();
    }
  });
}

function checkCollision(x, y, dino) {
  var trayX
  dino.isWalkingLeft === false ? trayX = 48 : trayX = -32;
  if (x > dino.x + trayX + 50 || x < dino.x + trayX
    || y + 70 < dino.y + 10 || y + 40 > dino.y + 45) {
    return false;
  }
  else {
    return true;
  }
}

function drawBroken(plate, ctx) {

  ctx.save();
  ctx.translate(plate.x - 23, newHeight - 49 + top);
  ctx.rotate(-plate.angle * Math.PI / 180);
  ctx.drawImage(food, plate.variety * 94 + 94, 0, 47, 70, 0, 0, 33, 49);
  ctx.restore();

  ctx.save();
  ctx.translate(plate.x - 36, newHeight - 21 + top);
  ctx.rotate(plate.angle * Math.PI / 180);
  ctx.drawImage(food, plate.variety * 94 + 94, 70, 47, 30, 0, 0, 33, 21);
  ctx.restore();

  ctx.save();
  ctx.translate(plate.x + 36, newHeight - 49 + top);
  ctx.rotate(plate.angle * Math.PI / 180);
  ctx.drawImage(food, plate.variety * 94 + 94 + 47, 0, 47, 70, 0, 0, 33, 49);
  ctx.restore();

  ctx.save();
  ctx.translate(plate.x + 23, newHeight - 21 + top);
  ctx.rotate(-plate.angle * Math.PI / 180);
  ctx.drawImage(food, plate.variety * 94 + 94 + 47, 70, 47, 30, 0, 0, 33, 21);
  ctx.restore();
}

export { servedDish, brokenPlates };
