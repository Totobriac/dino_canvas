import { generateRoad, drawScenery } from "./road.js";
import { sound } from "../../sound.js";

var strokesSound = new sound("./assets/6_race/strokes.mp3", false);

var arrowsKeys = new Image();
arrowsKeys.src = "./assets/6_race/keys_r_l.png";

var circleD = 0;
var start = false;
var width = 20;
var widthTickCount = 0;
var engineOn = false;
var motoArrived = false;
var vol = 1;

window.addEventListener('keydown', function (event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    strokesSound.play();
    strokesSound.volume(vol);
    startGame();
  }
})


export function startLevel(game, ctx) {

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  ctx.drawImage(arrowsKeys, 544, 175, 171 * 0.65, 77 * 0.65);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.start) {
    
    widthTickCount ++;

    generateRoad(game);
    drawScenery(ctx, game);

    if (widthTickCount % 4 === 0 ) {
      if (!motoArrived && width > 0) {
        width --;
      } else if (motoArrived) {
        width < 20 ? width ++ : game.switchLevel(7);
      }
    }

    if (motoArrived) {
      drawEndIntro(ctx);
    } else {
      width > 0 ? drawIntro(ctx) : engineOn = true;
    }

  }
}

function drawIntro(ctx) {
  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = width;
  for (let i = 0; i <= canvas.height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
  ctx.restore();
}

function drawEndIntro(ctx) {

  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = width;
  for (let i = 0; i <= canvas.width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  ctx.restore();
}

function startGame() {
  start = true;
};

function motoFinished() {
  motoArrived = true;
}

function updateVol (nb) {
  vol += nb;
  console.log(vol);
  strokesSound.volume(vol);
}

export { engineOn, motoFinished, updateVol, strokesSound, vol };
