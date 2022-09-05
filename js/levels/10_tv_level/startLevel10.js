import { playVideoPauleta } from "./channel1.js";
import { generateNoise } from "./noise.js";
import { buttonsChoice } from "./buttons.js";
import { playWheelGame } from "./wheelGame.js";

var video = document.getElementById("video");

var mouseKeys = new Image();
mouseKeys.src = "./assets/3_kitchen/left_mouse.png";

var overLay = new Image();
overLay.src = "./assets/10_tv/tvOverlay.png";

var mire = new Image();
mire.src = "./assets/10_tv/mire.png";

var circleD = 0;
var start = false;

var channel1 = false;

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

    var channel = buttonsChoice(game.mousePosition);
    console.log(channel1);
    switch (channel) {
      case 0:
        generateNoise(ctx);
        break;
      case 1:
        if (channel1) {
          video.pause();
          video.currentTime = 0;
          playWheelGame(ctx);
        } else {
          ctx.drawImage(mire, 240,0);
        }
        break;
      case 2:
        ctx.drawImage(mire, 240,0);
        break;
      case 3:
        channel1 = true;
        video.play();
        playVideoPauleta(ctx);
        break;
    }
    ctx.drawImage(overLay, 0, 0);
  }

}

function startGame() {
  start = true;
};
