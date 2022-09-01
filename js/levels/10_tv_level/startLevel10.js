import { generateNoise } from "./noise.js";

var mouseKeys = new Image();
mouseKeys.src = "./assets/3_kitchen/left_mouse.png";

var overLay = new Image();
overLay.src = "./assets/10_tv/tvOverlay.png";

var circleD = 0;
var start = false;

window.addEventListener('mousedown', function () {
  startGame();
})

export function startLevel(game, ctx) {

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

    generateNoise(ctx);
    ctx.drawImage(overLay, 0, 0);
  }

}

function startGame() {
  start = true;
};