const statue = new Image();
statue.src = 'https://i.ibb.co/3TvCH8n/liberty.png';

const sWidth = 200;
const sHeight = 200;

const origin = {x: 600, y: 1200 };
const radius = 900;
const start = 0.9272951769;
const end = 2.21429922;

let step = 0;
const totalSteps = 800;
const stepSize = (end - start)/totalSteps;

export function animateMonument(ctx) {

  if (step === totalSteps) step = 0;
  const angle = start + step++ * stepSize;

  ctx.translate(origin.x, origin.y);
  ctx.rotate(-angle);
  
  ctx.translate(radius, 0);
  ctx.rotate(Math.PI/2);

  ctx.translate(-sWidth/2, -sHeight/2);
  ctx.drawImage(statue, 0, 0, sWidth, sHeight);
  ctx.resetTransform();
}
