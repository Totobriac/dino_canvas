import { generateBackground } from "./nuit_etoilée.js";
import { drawDinoPiano } from "./dino_piano.js";
import { generateBridge } from "./bridge.js";
import { generatePiano } from "./piano.js";
import { generateRain } from "./rain.js";

var arrowsKeys = new Image();
arrowsKeys.src = "./assets/5_bridge/arrows.png";

var circleD = 0;
var start = false;

window.addEventListener('mousedown', function () {
  startGame();
})

export function startLevel(ctx, game, dino) {

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  ctx.drawImage(arrowsKeys, 545, 155, 160 * 0.7, 114 * 0.7);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.start) {

    generateBackground(ctx, game);
    drawDinoPiano(ctx, dino);
    generateBridge(ctx);
    generatePiano(ctx, game.frame);
    generateRain(ctx, game);

  }
}

function startGame() {
  start = true;
};
