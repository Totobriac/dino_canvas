var food = new Image();
food.src = "../assets/restaurant_level/food.png";

import { notes } from "./notepad.js";

var platesArray = [];
var servedDish;

class Plates {
  constructor(ctx) {
    this.x = 100 + Math.random() * 700;
    this.y = -60;
    this.vy = 0.4;
    this.acc = 0;
    this.ctx = ctx;
    this.height = 67;
    this.width = 70;
    this.variety = Math.floor(Math.random() * 15);
    this.hasCollided = false;
  }
  draw() {
    this.ctx.drawImage(food, this.variety * 94, 0, 94, 100, this.x, this.y, this.height, this.width)
  }
  update(dino, ctx) {
    this.acc += 0.02;
    this.y += (this.vy + this.acc);
    if (checkCollision(this.x, this.y, dino, ctx)) {
      this.hasCollided = true;
      servedDish = this.variety;
    }
    if (this.hasCollided == false) this.draw();
  }
}

export function generatePlates(ctx, frame, dino) {
  if (frame % 90 === 0) {
    platesArray.unshift(new Plates(ctx));
  }
  for (let i = 0; i < platesArray.length; i++) {
    platesArray[i].update(dino, ctx);
    if (platesArray[i].y > 375) {
      platesArray.splice(i, 1)
    }
  }
  if (platesArray.length > 15) {
    platesArray.pop(platesArray[0])
  }
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

function resetDish() {
  servedDish = undefined;
}

export { servedDish, resetDish };
