import { sound } from "../../sound.js";

var door = new Image();
door.src = "./assets/8_zeldouille/door.png";

var doorOpening = new sound("./assets/8_zeldouille/sounds/doorSound.mp3");

var width = 269;
var height = 600;

var alpha = 0;
var angle;
var zoom = 0.8;

var step = 0;
var delay = 0;

var isPlaying = false;

function drawDoorAnimation(ctx, game) {
  doorOpening.volume(1);
  if (!isPlaying) doorOpening.play(), isPlaying = true;
  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  switch (step) {
    case 0:
      zoom < 1.2 ? zoom += 0.005 : step = 1;
      break;
    case 1:
      delay < 100 ? delay++ : step = 2;
      break;
    case 2:
      alpha < 30 ? alpha += 0.4 : step = 3;
      break;
    case 3:
      zoom < 1.8 ? zoom += 0.005 : step = 4;
      break;
    case 4:      
      ctx.globalAlpha >= 0.01 ? ctx.globalAlpha -= 0.01 : game.switchLevel(9);
      break;
  }

  angle = (alpha * Math.PI) / 180;

  ctx.save();
 
  for (var i = 0; i <= height / 2; ++i) {
    ctx.setTransform(zoom, (angle * i) / height, 0, zoom, (1200 - width * zoom) / 2, 20);
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




    
    ctx.setTransform(zoom, (-angle * i) / height, 0, zoom, (1200 - width * zoom) / 2, 20);
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


export { drawDoorAnimation };