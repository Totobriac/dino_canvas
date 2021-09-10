const bubblesArray = [];

class Bubble {
  constructor(ctx) {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.ctx = ctx;
  }
  update(dino) {
    this.y -= this.speed;
    const dx = this.x - dino.x;
    const dy = this.y - dino.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
    this.draw()
  }
  draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();
  }
}

export function generateBubbles(ctx, frame, dino) {
  if (frame % 50 == 0) {
    bubblesArray.push(new Bubble(ctx))
  }
  for (let i = 0; i < bubblesArray.length; i++) {
    bubblesArray[i].update(dino);
    if(bubblesArray[i].distance < bubblesArray[i].radius + dino.radius) {
      bubblesArray.splice(i, 1);
      continue      
    }
    if (bubblesArray[i].y < - bubblesArray[i].radius) {
      bubblesArray.splice(i, 1);
      i--;
    }

  }
}