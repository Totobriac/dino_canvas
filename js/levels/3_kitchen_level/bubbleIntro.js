let bubbles = [];

function addBubble(ctx) {
  bubbles.push(new Bubble(ctx))
};

class Bubble {
  constructor(ctx) {
    this.radius = (Math.random() * 150) + 30;
    this.life = true;
    this.x = (Math.random() * 1200);
    this.y = (Math.random() * 20 + (400 + this.radius));
    this.vy = ((Math.random() * 0.0002) + 0.0001) + 2.6;
    this.vr = 0;
    this.vx = (Math.random() * 3) - 2;
    this.color = "blue";
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
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
  }
}

function update(ctx) {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    if (!bubbles[i].life)
      bubbles.splice(i, 1);
  }
  if (bubbles.length < 5)
    addBubble(ctx);
}

export function drawBubbles(ctx) {
  update(ctx);

  ctx.beginPath();
  for (let i=bubbles.length - 1; i >= 0; i--) {
    bubbles[i].draw();
  }
  ctx.fill();

}
