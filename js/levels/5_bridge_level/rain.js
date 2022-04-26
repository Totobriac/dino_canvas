let particlesArray = [];
var numberOfParticles = 400;
var frame = 0;
var globalAlpha = 0.31;
var stillRaining = true;

class Particle {
  constructor(ctx) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -400;
    this.speed = 0;
    this.velocity = Math.random() * 3.5 + 2;
    this.size = Math.random() * 2;
    this.ctx = ctx;
  }
  update() {
    this.y += this.velocity;
    if (this.y >= canvas.height && stillRaining ) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

function generateRain(ctx, game) {

  if (game.loadedLevel[5] === false) {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(ctx));
    }
    game.loadedLevel[5] = true;
  }
  ctx.save();
  ctx.globalAlpha = globalAlpha;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}

function stopRain() {
  stillRaining = false;
}

export { generateRain, stopRain };
