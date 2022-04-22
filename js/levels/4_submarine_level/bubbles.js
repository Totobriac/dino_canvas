var bubbles = [];

class Bubble {
  constructor(ctx) {
    this.x = Math.floor(Math.random() * 1200);
    this.y = Math.floor(Math.random() * 800) + 400;
    this.radius = Math.floor(Math.random() * 1) + 5;
    this.ctx = ctx;
    this.ySpeed = 4;
    this.acc = 0.2;
  }
  draw() {
    this.ctx.strokeStyle = "rgba(34,147,214,1)";
    this.ctx.fillStyle = "rgba(255,255,255,0.8)";
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(this.x - 8, this.y - 8, this.radius / 2.5, 0, Math.PI *2 );
    this.ctx.arc(this.x + 10, this.y + 4, this.radius / 5, 0, Math.PI *2 );
    this.ctx.fill();
  }
  update() {
    this.radius += 0.2;
    this.ySpeed += this.acc;
    this.y -= this.ySpeed;
    this.draw();
  }
}

function generateBubbles(ctx) {
  if (bubbles.length === 0) {
    for (let i = 0; i < 200; i++) {
      bubbles.push(new Bubble(ctx))
    }
  } else {
    bubbles.forEach((bubble, i) => {
      bubble.update();
    });
  }
}

export {
  generateBubbles
};
