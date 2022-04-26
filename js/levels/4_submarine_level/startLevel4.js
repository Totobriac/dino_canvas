import { drawSubmarine } from "./submarine.js";
import { generateMines, handleExplosion } from "./mines.js";
import { generateEyes } from "./eyes.js";
import { tick } from "./tunnel.js";
import { generateBubbles, endBubbles } from "./bubbles.js";
import { generateShark } from "./shark.js";
import { drawCounter } from "./counter.js";

var mouseKeys = new Image();
mouseKeys.src = "./assets/3_kitchen/left_mouse.png";

var circleD = 0;
var start = false;
var isDiving = false;


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

    if (!isDiving) tick(ctx);
    if (isDiving) {
      generateEyes(game, ctx, dino);
      drawSubmarine(ctx, dino, game.mousePosition);
      if (endBubbles) {
        generateMines(ctx, game.frame, dino);
        handleExplosion();
        generateShark(dino, ctx);
        drawCounter(dino, ctx);
      }
      generateBubbles(ctx);
    }
  }
}

function startGame() {
  start = true;
};

function dive() {
  isDiving = true;
}

export { dive } ;
