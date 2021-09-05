const particlesArray = []

class Particle {
  constructor(planeX, planeY, gamespeed, ctx) {
    this.x = planeX + 5;
    this.y = planeY + 66;
    this.size = Math.random() * 7 + 3;
    this.speed = (Math.random() * 1) - 0.5;
    this.color = "hsl(0, 0%," + (50 + Math.random() * 50) +"%)";
    this.gamespeed = gamespeed;
    this.ctx = ctx;
  }
  update() {
    this.x -= this.gamespeed;
    this.y += this.speed;
  }
  draw() {
    this.ctx.rotate(-22 * Math.PI / 180);
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.resetTransform();
  }
}

export function createParticles(planeX, planeY, gamespeed, ctx) {
  particlesArray.unshift(new Particle(planeX, planeY, gamespeed, ctx))
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  if (particlesArray.length > 200) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i])
    }
  }
}