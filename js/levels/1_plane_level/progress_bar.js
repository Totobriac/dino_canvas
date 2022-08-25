var flag = new Image();
flag.src = "../assets/1_plane/flag.png";

var tick = 0;
var maxTick = 3;
var filter = 0;

function drawProgBar(ctx, score) {

  if (score > 0) {
    score > 4172 ? score = 4172 : score = score;
  }
 
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
  ctx.fillRect(452, 371, score / 14  , 18 );

  ctx.drawImage(flag, 754, 370);

  ctx.filter = "none";
}

export { drawProgBar };
