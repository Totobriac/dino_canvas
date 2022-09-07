import { playVideoPauleta, stopVideoPauleta } from "./channel3.js";
import { generateNoise } from "./noise.js";
import { buttonsChoice } from "./buttons.js";
import { playWheelGame } from "./wheelGame.js";
import { drawCredits } from "./credits.js";
import { soundPlayer } from "./sounds.js";


var mouseKeys = new Image();
mouseKeys.src = "./assets/3_kitchen/left_mouse.png";

var overLay = new Image();
overLay.src = "./assets/10_tv/tvOverlay.png";

var mire = new Image();
mire.src = "./assets/10_tv/mire.png";

var circleD = 0;
var start = false;

var channel1 = false;
var channel2 = true;

var channel = 0;

window.addEventListener('mousedown', function () {
  startGame();
})

var playNoise = true;

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

    if (playNoise) soundPlayer(8);

    if (buttonsChoice(game.mousePosition)) {
      channel = buttonsChoice(game.mousePosition);
      soundPlayer(9);
      soundPlayer(7);
      playNoise = false;
    }

    switch (channel) {
      case 0:
        generateNoise(ctx);
        break;
      case 1:
        stopVideoPauleta();
        if (channel1) {
          playWheelGame(ctx);
          soundPlayer(7);
        } else {
          ctx.drawImage(mire, 240, 0);
          soundPlayer(6);
        }
        break;
      case 2:
        stopVideoPauleta();
        if (channel2) {
          drawCredits(ctx);
          soundPlayer(7);
        } else {
          ctx.drawImage(mire, 240, 0);
          soundPlayer(6);
        }
        break;
      case 3:
        soundPlayer(7);
        playVideoPauleta(ctx);
        break;
    }
    ctx.drawImage(overLay, 0, 0);
  }

}

function startGame() {
  start = true;
};

function start1() {
  channel1 = true;
};

function start2() {
  channel2 = true;
};

export { start1, start2 };
