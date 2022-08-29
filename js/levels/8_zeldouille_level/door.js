var door = new Image();
door.src = "./assets/8_zeldouille/door2.png";

var width = door.width;
var height = door.height;

var alpha = 0;
var angle;

var opening = false;


function drawDoorAnimation(ctx) {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  if (alpha < 40) alpha += 1;

  angle = (alpha * Math.PI) / 180;

  ctx.save();
  for (var i = 0; i <= height / 2; ++i) {
    ctx.setTransform(1, (angle * i) / height, 0, 1, (1200 - width) / 2, 0);
    ctx.drawImage(
      door,
      0,
      height / 2 - i,
      width,
      2,
      0,
      height / 2 - i,
      width * Math.cos(angle),
      2
    );
    ctx.setTransform(1, (-angle * i) / height, 0, 1, (1200 - width) /2, 0);
    ctx.drawImage(
      door,
      0,
      height / 2 + i,
      width,
      2,
      0,
      height / 2 + i,
      width * Math.cos(angle),
      2
    );
  }
  ctx.restore();
}

function skew() {

}

export { drawDoorAnimation };