let bubbles = [];

var startY = 500;

function addBubble(ctx, startY) {
  bubbles.push(new Bubble(ctx, startY))
};

class Bubble {
  constructor(ctx, startY) {
    this.radius = (Math.random() * 150) + 10;
    this.life = true;
    this.x = (Math.random() * 1200);
    this.startY = startY;
    this.y = (Math.random() * 20 + (this.startY + this.radius));
    this.vy = ((Math.random() * 0.0002) + 0.0001) + 2.6;

    this.vr = 0;
    this.vx = (Math.random() * 3) - 2;
    this.ctx = ctx;
  }
  update() {
    this.vy += .00001;
    this.vr += .02;
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

function update(ctx, startY) {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    if (!bubbles[i].life)
      bubbles.splice(i, 1);
  }
  if (bubbles.length < 300)
    addBubble(ctx, startY);
}

export function drawBubbles(ctx) {

  startY -= 0.4;

  update(ctx, startY);

  ctx.beginPath();
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].draw();
  }
  ctx.rect(0, startY, 1200, 400);
  ctx.fill();

}
