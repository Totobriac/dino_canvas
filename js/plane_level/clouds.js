const cloud = new Image();
cloud.src = "../assets/plane_level/cloud.png";

const sWidth = 200;
const sHeight = 100;

const origin = { x: 600, y: 1200 };
const radius = 1000;
const start = 0.9272951769;
const end = 2.21429922;

let step = 0;
const totalSteps = 1220;
const stepSize = (end - start) / totalSteps;

let cloudsArray = []

class Cloud {
  constructor(step) {
    this.step = step
  }
}

export function animateCloud(ctx, frame) {

  if (frame % 300 === 0) {
    cloudsArray.unshift(new Cloud(0))
  }

  if (cloudsArray.length > 5) {
    cloudsArray.pop(cloudsArray[0])
  }

  for (let i = 0; i < cloudsArray.length; i++) {
    
    if (cloudsArray[i].step === totalSteps) cloudsArray[i].step = 0;
    const angle = start + cloudsArray[i].step++ * stepSize;

    ctx.translate(origin.x, origin.y);
    ctx.rotate(-angle);

    ctx.translate(radius, 0);
    ctx.rotate(Math.PI / 2);

    ctx.translate(0, 0)
    ctx.fillRect(0, 0, 3, 3);

    ctx.translate(-sWidth / 2, 100);
    ctx.drawImage(cloud, 0, 0, sWidth, sHeight);
    ctx.resetTransform();
  }  
}
