import { removeMask } from "./startLevel3.js";

let bubbles = [];

var startY = 500;
var startYDown = 0;

function addBubble(ctx, direction, startY) {
  bubbles.push(new Bubble(ctx, direction, startY))
};

class Bubble {
  constructor(ctx, direction, startY) {
    this.radius = (Math.random() * 150) + 10;
    this.life = true;
    this.x = (Math.random() * 1200);
    this.direction = direction;
    this.startY = startY;
    this.y = ((Math.random() * 20 + (this.startY + this.radius))) * this.direction;
    this.vy = ((Math.random() * 0.0002) + 0.0001) + 2.6 * this.direction;

    this.vr = 0;
    this.vx = (Math.random() * 3) - 2;
    this.ctx = ctx;
  }
  update() {
    this.vy += .00001 * this.direction;
    this.vr += .02 * this.direction;
    this.y -= this.vy;
    this.x += this.vx;
    if (this.radius > 1)
      this.radius -= this.vr;
    if (this.radius <= 1)
      this.life = false;
  }
  draw() {
    this.ctx.moveTo(this.x + this.radius, this.y);
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  }
}

function update(ctx, direction, startY) {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    if (!bubbles[i].life)
      bubbles.splice(i, 1);
  }
  if (bubbles.length < 300)
    addBubble(ctx, direction, startY);
}

export function drawBubbles(ctx, direction) {

  if (direction === 1) {
    startY > 0.4 ? startY -= 0.4 : removeMask(ctx);
    update(ctx, direction, startY);
  } else {
    update(ctx, direction, startYDown);
  }  

  ctx.beginPath();
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].draw();
  }

  if (direction === 1) ctx.rect(0, startY, 1200, 400);

  ctx.fill();

}
