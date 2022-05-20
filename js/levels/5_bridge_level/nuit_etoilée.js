import { stopRain } from "./rain.js";
import { drawHug } from "./hug.js";

var painting = new Image();
painting.src = "./assets/5_bridge/starry_night_no_stars.png";


var frame = 0;
var sourceX = 300;
var sourceY = 200;
var sourceWidth = 600;
var sourceHeight = 200;

function generateBackground(ctx, game) {

  if (frame < 500) {
    ctx.drawImage(painting, 300, 200, 600, 200, 0, 0, canvas.width, canvas.height);
    frame++;
  }
  else if (frame >= 500 && frame < 900) {
    ctx.drawImage(painting, sourceX -= 0.75, sourceY -= 0.5, sourceWidth += 1.5, sourceHeight += 0.5, 0, 0, canvas.width, canvas.height);
    frame++;
  }
  else {
    ctx.drawImage(painting, 0, 0);
    drawHug(ctx);    
    stopRain();
  }
}

export { generateBackground };
