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
    this.frame = Math.floor(Math.random() * 15);
  }
  draw() {
    this.ctx.drawImage(food, this.frame * 94, 0, 94, 100, this.x, this.y, 67, 70)
  }
  update() {
    this.acc += 0.05;
    this.y += (this.vy + this.acc);
    this.draw();
  }
}

export function generatePlates(ctx, frame) {
  if (frame % 100 === 0) {
    platesArray.unshift(new Plates(ctx));
  }
  for (let i = 0; i < platesArray.length; i++) {
    platesArray[i].update();
    if (platesArray[i].y > 375) {
      platesArray.splice(i, 1)
    }
  }
}
