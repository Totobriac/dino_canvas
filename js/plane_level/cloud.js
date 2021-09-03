const cloudsArray = [];

class Cloud {
  constructor(r1, r2, r3, color, gamespeed, ctx) {
    this.r1 = r1;
    this.r2 = r2;
    this.r3 = r3;
    this.color = color;
    this.gamespeed = gamespeed;
    this.ctx = ctx;
    this.x = 1200;
  }
  draw(ctx, r1, r2, r3, color) {
    ctx.fillStyle = color;
    drawCircle(this.x, 400, 15, ctx);
    drawCircle(this.x + 110, 395, r1, ctx);
    drawCircle(this.x + 60, 395, r2, ctx);
    drawCircle(this.x + 20, 395, r3, ctx);
    ctx.fillStyle = 'white';
  }
  update() {
    this.x -= this.gamespeed * 0.5
    this.draw(this.ctx, this.r1, this.r2, this.r3, this.color)
  }
}

export function createClouds(ctx, frame, gamespeed) {
  if (frame % 100 === 0) {
    const r1 = 25 + Math.random() * 30;
    const r2 = 25 + Math.random() * 20;
    const r3 = 25 + Math.random() * 15;
    const cloudsColors = ['#aaada1', '#9a9c95', '#c1c2be'];
    const color = cloudsColors[Math.floor(Math.random() * 3)];
    cloudsArray.unshift(new Cloud(r1, r2, r3, color, gamespeed, ctx));
  }
  for (let i = 0; i < cloudsArray.length; i++) {
    cloudsArray[i].update();
  }
  if (cloudsArray.length > 7) {
    cloudsArray.pop(cloudsArray[0])
  }
}

function drawCircle(cx, cy, radius, ctx) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.fill();
}