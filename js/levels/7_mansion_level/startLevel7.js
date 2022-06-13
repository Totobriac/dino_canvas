import { pointNClick } from "./gameMecanic.js";
import { drawIntro, drawEnding } from "./intro.js";
import { ended } from "./gameMecanic.js";

var mouseKeys = new Image();
mouseKeys.src = "./assets/3_kitchen/left_mouse.png";

var circleD = 0;
var start = false;
//var gameBegun = false;
var gameBegun = true;

window.addEventListener('mousedown', function () {
  startGame();
})

export function startLevel(ctx, game) {

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  var canvasDiv = document.getElementById("canvas");
  canvasDiv.setAttribute("style", "cursor: url('../assets/7_mansion/pointer.png'), auto");

  ctx.drawImage(mouseKeys, 545, 130, 160 * 0.7, 164 * 0.7);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.start) {
    pointNClick(ctx, game, gameBegun);
    //gameBegun = drawIntro(ctx, game);
    if (ended) drawEnding(ctx);
  }
}

function startGame() {
  start = true;
};
