import { drawSubmarine } from "./submarine.js";
import { generateBubbles, handleExplosion } from "./bubbles.js";
import { generateEyes } from "./eyes.js";
import { tick } from "./tunnel.js";

var mouseKeys = new Image();
mouseKeys.src = "./assets/3_kitchen/left_mouse.png";

var circleD = 0;
var start = false;

window.addEventListener('mousedown', function () {
  startGame();
})

export function startLevel(ctx, game, dino) {

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  ctx.drawImage(mouseKeys, 545, 130, 160 * 0.7, 164 * 0.7);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.start) {
    tick(ctx);
    // generateEyes(game, ctx);
    // drawSubmarine(ctx, dino, game.mousePosition);
    // generateBubbles(ctx, game.frame, dino);
    // handleExplosion();
  }  
}

function startGame() {
  start = true;
};
