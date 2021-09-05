const sWidth = 110;
const sHeight = 60;

const origin = { x: 600, y: 1200 };
const radius = 900;
const start = 0.9272951769;
const end = 2.21429922;

let step = 0;
const totalSteps = 1220;
const stepSize = (end - start) / totalSteps;

let cloudsArray = []
const cloudColors = ['#83857e', '#acadaa', '#cecfcc'];


class Cloud {
  constructor(step) {
    this.step = step;
    this.r1;
    this.r2;
    this.r3;
    this.color;
    this.createCloud();
  }
  createCloud() {
    this.r1 = 25 + Math.random() * 20;
    this.r2 = 25 + Math.random() * 10;
    this.r3 = 25 + Math.random() * 5;
    this.color = cloudColors[Math.floor(Math.random() * 3)];
  }
}

export function animateCloud(ctx, frame) {
  ctx.translate(origin.x, origin.y);
  drawCircle(0, 50, 900, ctx);
  ctx.fillStyle="#acadaa";
  ctx.fill();
  if (frame % 160 === 0) {
    cloudsArray.unshift(new Cloud(0))
  }
  if (cloudsArray.length > 8) {
    cloudsArray.pop(cloudsArray[0])
  }
  for (let i = 0; i < cloudsArray.length; i++) {
    if (cloudsArray[i].step === totalSteps) cloudsArray[i].step = 0;
    const angle = start + cloudsArray[i].step++ * stepSize;
    ctx.translate(origin.x, origin.y);
    ctx.rotate(-angle);
    ctx.translate(radius, 0);
    ctx.rotate(Math.PI / 2);
    ctx.translate(0, 0);   
    drawCloud(ctx, i);   
  }
}

function drawCloud(ctx, i) {
  ctx.fillStyle = cloudsArray[i].color;
  ctx.fillRect(-35, 0, 70, 20);
  drawCircle(-35, 10, 10, ctx);
  drawCircle(35, 5, cloudsArray[i].r1, ctx);
  drawCircle(0, 5, cloudsArray[i].r2, ctx);
  drawCircle(-10, 10, cloudsArray[i].r3, ctx);
  ctx.fillStyle = 'white';
  ctx.fillRect(-40, 20, 115, 30);
  ctx.resetTransform();
}

function drawCircle(cx, cy, radius, ctx) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.fill();
}
