var fruit = new Image();
fruit.src = "../assets/kitchen_level/fraise.png";

const fruitsArray = [];

class Fruit {
  constructor(ctx) {
    this.controlPtX = Math.floor(Math.random() * 1200)
    this.startPtX = Math.floor(Math.random() * 1200);
    this.endPtX = Math.floor(Math.random() * 1200);
    this.startPt = { x: this.startPtX, y: 400 };
    this.controlPt = { x: this.controlPtX, y: -400 };
    this.endPt = { x: this.endPtX, y: 400 };
    this.percent = 0;
    this.gravity = 0;
    this.ctx = ctx;
    this.point;
  }
  update() {    
    this.gravity += 0.02
    if (this.percent < 1) this.percent += 0.003;
    this.point = getQuadraticBezierXYatPercent(this.startPt, this.controlPt, this.endPt, this.percent);
    this.draw();
  }
  draw() {
    this.ctx.drawImage(fruit, this.point.x, this.point.y + this.gravity, 60, 60);
  }
}

export function generateFruits(ctx, frame) {
  if (frame % 50 === 0) {
    fruitsArray.unshift(new Fruit(ctx));
  }
  for (let i = 0; i < fruitsArray.length; i++) {
    fruitsArray[i].update();
  }
  if (fruitsArray.length > 10) {
    fruitsArray.pop(fruitsArray[0])
  }
}

function getQuadraticBezierXYatPercent(startPt, controlPt, endPt, percent) {
  var x =
    Math.pow(1 - percent, 2) * startPt.x +
    2 * (1 - percent) * percent * controlPt.x +
    Math.pow(percent, 2) * endPt.x;
  var y =
    Math.pow(1 - percent, 2) * startPt.y +
    2 * (1 - percent) * percent * controlPt.y +
    Math.pow(percent, 2) * endPt.y;
  return { x: x, y: y };
}
