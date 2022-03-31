import { note } from "./notepad.js";
import { newHeight } from "./startLevel2.js";

var food = new Image();
food.src = "./assets/2_restaurant/food.png";

var platesArray = [];
var brokenPlates = [];
var servedDish;

var canCollide = true;

class Plates {
  constructor(ctx) {
    this.x = 100 + Math.random() * 700;
    this.y = -60;
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
    if (this.y < newHeight - 67) {
      this.acc += 0.02;
      this.y += (this.vy + this.acc);
    } else {
      platesArray.splice(i, 1);
      i--;
      brokenPlates.push({ variety: this.variety, x: this.x });
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
    if (this.hasCollided == false) this.draw();
  }
}

export function generatePlates(ctx, frame, dino) {
  if (frame % 40 === 0) {
    platesArray.unshift(new Plates(ctx));
  }

  for (let i = 0; i < platesArray.length; i++) {
    platesArray[i].update(dino, i);
  }

  if (brokenPlates.length > 0) {
    brokenPlates.forEach(plate => {
      drawBroken(plate, ctx);
    })
  }
  
  if (platesArray.length > 150) {
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

function drawBroken(plate, ctx) {  
  ctx.drawImage(food, plate.variety * 94 + 94, 0, 47, 100, plate.x, newHeight - 67, 33, 70);
  ctx.drawImage(food, plate.variety * 94 + 94 + 47, 0, 47, 100, plate.x + 40, newHeight - 67, 33, 70);

  ctx.drawImage(food, plate.variety * 94 + 94, 0, 94, 70, plate.x, newHeight - 49, 67, 49);
  ctx.drawImage(food, plate.variety * 94 + 94, 70, 94, 30, plate.x + 40, newHeight - 21, 67, 21);


}

export { servedDish };
