const platesArray = [];

class Plates {
  constructor(ctx) {
    this.x = 100 + Math.random() * 900;
    this.y = 0;
    this.vy = 0.5;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, 40, 10);
  }
  update() {
    this.y += this.vy;
    this.draw();
  }
}

export function generatePlates(ctx, frame) {
  if (frame % 200 === 0) {
    platesArray.unshift(new Plates(ctx));
  }
  for (let i = 0; i < platesArray.length; i++) {
    platesArray[i].update();
    if (platesArray[i].y > 375) {
      platesArray.splice(i, 1)
    }
  }
}
