const mineSprite = new Image();
mineSprite.src = "./assets/4_submarine/mine_large.png";

const mineExplSprite = new Image();
mineExplSprite.src = "./assets/4_submarine/mine_explosion_hor.png";

const bubblesArray = [];
const explArray = [];


class Bubble {
  constructor(ctx) {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 40;
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
    this.ctx.drawImage(mineSprite, this.x - 44, this.y - 43, 85, 85)
  }
}

class Explosion {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.tickCount = 0;
    this.ticksPerFrame = 2;
    this.frames = 10;
    this.frameIndex = 0;
  }
  update() {
    this.tickCount += 1;
    this.draw();
  }
  draw() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      }
    }
    this.ctx.drawImage(mineExplSprite, this.frameIndex * 105, 0, 105, 105, this.x - 44, this.y - 43, 100, 100)
  }
}

export function generateBubbles(ctx, frame, dino) {
  if (frame % 50 == 0) {
    bubblesArray.push(new Bubble(ctx))
  }
  for (let i = 0; i < bubblesArray.length; i++) {
    bubblesArray[i].update(dino);
    if (bubblesArray[i].distance < bubblesArray[i].radius + dino.radius) {
      addExplosion(bubblesArray[i].x, bubblesArray[i].y, ctx);
      bubblesArray.splice(i, 1);
      continue
    }
    if (bubblesArray[i].y < - bubblesArray[i].radius) {
      bubblesArray.splice(i, 1);
      i--;
    }
  }
}

function addExplosion(x, y, ctx) {
  explArray.unshift(new Explosion(x, y, ctx));
}

export function handleExplosion() {
  if (explArray.length > 0) {
    for (let i = 0; i < explArray.length; i++) {
      explArray[i].frameIndex === 9 ? explArray.splice(i,1) : explArray[i].update();
    }
  }
}