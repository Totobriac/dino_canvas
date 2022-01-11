var tick = 0;
var maxTick = 3;
var filter = 0;

function drawProgBar(ctx, score) {
  tick += 1;
  if (tick >= maxTick) {
    tick = 0;
    filter < 4 ? filter += 1 : filter = 0;
  }

  ctx.filter = "url(#turb" + filter + ")";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(450, 370, 300, 20);

  ctx.fillStyle = "orange";
  ctx.fillRect(452, 371, score / 14  , 18 )
  ctx.filter = "none";
}

export { drawProgBar };
