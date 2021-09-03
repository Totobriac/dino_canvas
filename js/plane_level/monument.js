
const statue = new Image();
statue.onload = () => animate();
statue.src = 'https://i.ibb.co/3TvCH8n/liberty.png';
const sWidth = 180;
const sHeight = 180;
// circle values matching your path:
const origin = {x: 600, y: 1200 };
const radius = 900;
const start = 0.9272951769;
const end = 2.21429922;

// animation values
let step = 0;
const totalSteps = 120;
const stepSize = (end - start)/totalSteps;

// And our drawing function
export function animate(ctx) {
  //ctx.resetTransform();
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (step === totalSteps) step = 0;
  const angle = start + step++ * stepSize;

  // first, change the coordinate system so that we don't need
  // to compute *anything* to draw it in the right place:
  ctx.translate(origin.x, origin.y);
  ctx.rotate(-angle);
  
  // Then we draw the debug line:
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(radius, 0);
  ctx.stroke();
  
  // And then we draw the image. However, the image is upright
  // when (radius,0) lines up with the x-axis, which means it's
  // actually going to look rotated compared to our line. So:
  // again, we update the coordinate system to do the work for us.
  // we update it so that (radius,0) becomes (0,0), we then rotate
  // it a quarter turn, and then we draw our image at (0,0).
  ctx.translate(radius, 0);
  ctx.rotate(Math.PI/2);

  // of course, (0,0) is the image's top-left corner, so if we
  // want to center it, we can do one more translation:
  ctx.translate(-sWidth/2, -sHeight/2);
  ctx.drawImage(statue, 0, 0, sWidth, sHeight);

  // and move on to the next frame
  //requestAnimationFrame(animate);
}