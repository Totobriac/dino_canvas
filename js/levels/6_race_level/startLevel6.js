import { generateRoad, drawScenery } from "./road.js";

import { sound } from "../../sound.js";

var strokesSound = new sound("./assets/6_race/strokes.mp3", false);

var arrowsKeys = new Image();
arrowsKeys.src = "./assets/6_race/keys_r_l.png";

var circleD = 0;
var start = false;

window.addEventListener('keydown', function (event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    strokesSound.play();
    strokesSound.volume(1);
    startGame();
  }
})


export function startLevel(game, ctx) {

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  ctx.drawImage(arrowsKeys, 544, 170, 171 * 0.65, 77 * 0.65);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();


  if (game.start) {
    generateRoad(game);
    drawScenery(ctx, game);
  }
}

function startGame() {
  start = true;
};
