import { animate } from "./script.js";

var arrowsKeys = new Image();
arrowsKeys.src = "./assets/8_zeldouille/arrows.png";

var circleD = 0;
var start = false;

window.addEventListener('keydown', function(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft" ||
    e.key === "ArrowUp" || e.key === "ArrowDown") {
    startGame();
  }
})


export function startLevel(game, ctx) {

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  ctx.drawImage(arrowsKeys, 544, 150, 176 * 0.65, 124 * 0.65);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.start) {
    animate(game, ctx);
  }

}

function startGame() {
  start = true;
};
