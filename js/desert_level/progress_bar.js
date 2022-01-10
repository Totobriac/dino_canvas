var tick = 0;
var maxTick = 3;
var filter = 0;

function drawProgBar(ctx, dino) {
  tick += 1;
  if (tick >= maxTick) {
    tick = 0;
    filter < 4 ? filter += 1 : filter = 0;
  }

  ctx.filter = "url(#turb" + filter + ")";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(780, 30, 400, 30);

  ctx.fillStyle = "green";
  ctx.fillRect(782, 32, dino.score * 3, 26 )
  ctx.filter = "none";
}

export { drawProgBar };
