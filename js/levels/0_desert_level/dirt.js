import { isJumping } from "./desert_dino.js";

const particlesArray = []

class Particle {
  constructor(x, y, gamespeed, ctx, angle) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 3;
    this.speed = (Math.random() * 1) - 0.7;
    this.color = "grey";
    this.gamespeed = gamespeed;
    this.ctx = ctx;
    this.angle = angle;
  }
  update() {
    this.x -= 1.3;
    this.y += this.speed;
  }
  draw() {
    if (this.y > 270) {
      this.ctx.rotate(this.angle * Math.PI / 180);
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.resetTransform();
    }
  }
}

export function generateDirt(x, y, gamespeed, ctx, angle) {

  if (isJumping === false && gamespeed != 0) {
    particlesArray.unshift(new Particle(x, y, gamespeed, ctx, angle))
  }

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  if (particlesArray.length > 70) {
    for (let i = 0; i < 5; i++) {
      particlesArray.pop(particlesArray[i])
    }
  }
}