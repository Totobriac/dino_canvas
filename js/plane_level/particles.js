const particlesArray = []

var smokeSprite = new Image();
smokeSprite.src = "../assets/plane_level/smoke.png";

class Particle {
  constructor(planeX, planeY, gamespeed, ctx, angle) {
    this.x = planeX - 5 ;
    this.y = planeY  + 25;
    this.size = Math.random() * 7 + 3;
    this.speed = (Math.random() * 1) - 0.5;
    this.color = "hsl(0, 0%," + (50 + Math.random() * 50) +"%)";
    this.gamespeed = gamespeed;
    this.ctx = ctx;
    this.angle = angle;
  }
  update() {
    this.x -= this.gamespeed;
    this.y += this.speed;
  }
  draw() {
    this.ctx.rotate(this.angle * Math.PI / 180);
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.resetTransform();
  }
}

export function createParticles(planeX, planeY, gamespeed, ctx, angle) {
  particlesArray.unshift(new Particle(planeX, planeY, gamespeed, ctx, angle))
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  if (particlesArray.length > 40) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i])
    }
  }
}
