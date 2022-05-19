let particlesArray = [];
var numbParticles = 1400;
var globalAlpha = 0.31;
var stillRaining = true;

var tempCanvas = document.createElement('canvas');
var tempContext = tempCanvas.getContext('2d');

tempCanvas.width = 1200;
tempCanvas.height = 400;

class Particle {
  constructor(ctx) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -400;
    this.speed = 0;
    this.velocity = Math.random() * 9.5 + 12;
    this.size = Math.random() * 12;
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
    for (let i = 0; i < numbParticles; i++) {
      // particlesArray.push(new Particle(ctx));
      particlesArray.push(new Particle(tempContext));

    }
    game.loadedLevel[5] = true;
  }
  // ctx.save();
  // ctx.globalAlpha = globalAlpha;
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.restore();
  // for (let i = 0; i < particlesArray.length; i++) {
  //   particlesArray[i].update();
  //   particlesArray[i].draw();
  // }
  tempContext.clearRect(0,0,1200,400)
  tempContext.globalAlpha = 0.2;
  tempContext.fillStyle = 'rgb(0,0,0)';
  tempContext.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numbParticles; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  ctx.drawImage(tempCanvas,0,0);
}

function stopRain() {
  stillRaining = false;
}

export { generateRain, stopRain };
