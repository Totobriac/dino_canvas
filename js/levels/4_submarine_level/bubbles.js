var bubbles = [];
var sinTick = 0;

class Bubble {
  constructor(ctx) {
    this.x = Math.floor(Math.random() * 1200);
    this.y = Math.floor(Math.random() * 1800) + 400;
    this.radius = Math.floor(Math.random() * 1) + 5;
    this.ctx = ctx;
    this.ySpeed = 2;
    this.acc = 0.05;
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
  update(sinTick) {
    this.x += Math.floor(Math.sin(sinTick)*2);
    this.radius += 0.08;
    this.ySpeed += this.acc;
    this.y -= this.ySpeed;
    this.draw();
  }
}

function generateBubbles(ctx) {
  if (bubbles.length === 0) {
    for (let i = 0; i < 300; i++) {
      bubbles.push(new Bubble(ctx))
    }
  } else {
    bubbles.forEach((bubble, i) => {
      sinTick ++;
      bubble.update(sinTick);
    });
  }
}

export {
  generateBubbles
};
