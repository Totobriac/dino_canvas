const food = new Image();
food.src = "../assets/restaurant_level/food.png"

const platesArray = [];


class Plates {
  constructor(ctx) {
    this.x = 100 + Math.random() * 900;
    this.y = -60;
    this.vy = 0.4;
    this.acc = 0;
    this.ctx = ctx;
    this.height = 67;
    this.width = 70;
    this.frame = Math.floor(Math.random() * 15);
  }
  draw() {
    this.ctx.drawImage(food, this.frame * 94, 0, 94, 100, this.x, this.y, this.height, this.width)
  }
  update(dino, ctx) {
    this.acc += 0.02;
    this.y += (this.vy + this.acc);
    checkCollision(this.x, this.y, dino, ctx);
    this.draw();
  }
}

export function generatePlates(ctx, frame, dino) {
  if (frame % 100 === 0) {
    platesArray.unshift(new Plates(ctx));
  }
  for (let i = 0; i < platesArray.length; i++) {
    platesArray[i].update(dino, ctx);
    if (platesArray[i].y > 375) {
      platesArray.splice(i, 1)
    }
  }
}

function checkCollision(x, y, dino, ctx) {
  var trayX
  dino.isWalkingLeft === false ? trayX = 48 : trayX = -32;
  if (x > dino.x + trayX + 50 || x < dino.x + trayX
    || y + 70 < dino.y + 10 || y + 40 > dino.y + 45) {
    return
  }
  else {
    console.log("et");
  }
}
