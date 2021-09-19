var painting = new Image();
painting.src = "../assets/bridge_level/starry_night_no_stars.png";

var bridge = new Image();
bridge.src = "../assets/bridge_level/large_bridge.png";

let particlesArray = [];
const numberOfParticles = 1000;


class Particle {
  constructor(ctx) {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 3.5 + 4;
    this.size = Math.random() * 2.5;
    this.ctx = ctx;
  }
  update() {
    this.y += this.velocity;
    if (this.y >= canvas.height) {
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


export function generatePainting(ctx, game) {

  if (game.level6Started === false) {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(ctx));
    }
    game.level6Started = true;
  }
  //ctx.globalAlpha = 1;
  ctx.drawImage(painting, 0, 0);
  ctx.globalAlpha = 1;
  ctx.drawImage(bridge, 0, 195);
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}
