import { animate } from "./script.js";
import { drawDoorAnimation } from "./door.js";
import { playSound } from "./music.js";

var arrowsKeys = new Image();
arrowsKeys.src = "./assets/8_zeldouille/arrows.png";

var circleD = 0;
var start = false;

var didTheDinoSuceedToGetTheKey = false;
var deleteAll = false;

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

    if (!deleteAll) animate(game, ctx);

    if (didTheDinoSuceedToGetTheKey) {
      playSound(22);
      drawDoorAnimation(ctx, game);
    }
  }
}

function startGame() {
  start = true;
};

function endLevel() {
  didTheDinoSuceedToGetTheKey = true;
}

function deleteLevel() {
  deleteAll = true;
}

export { endLevel, deleteLevel };
