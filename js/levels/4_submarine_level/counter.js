import { shark } from "./shark.js";

var finSprite = new Image();
finSprite.src = "./assets/4_submarine/fin_icon.png";

var periscoSprite = new Image();
periscoSprite.src = "./assets/4_submarine/peri_icon.png";

function drawCounter(dino, ctx) {
  ctx.lineWidth = 2;

  ctx.drawImage(periscoSprite, 480, 5, 35, 35);
  ctx.drawImage(finSprite, 930, 5, 35, 35);

  ctx.fillStyle = "rgb(255,204,0)";
  ctx.fillRect(525, 12, dino.score * 4, 26);

  ctx.fillStyle = "rgb(29,48,70)";
  ctx.fillRect(525 + dino.score * 4, 12, 400 - dino.score * 4, 26);

  ctx.strokeStyle = "blue";
  ctx.strokeRect(525, 10, 400, 30);
}

export { drawCounter };
