import { generateBackground } from "./nuit_etoilée.js";
import { drawDinoPiano } from "./dino_piano.js";
import { generateBridge } from "./bridge.js";
import { generatePiano } from "./piano.js";
import { generateRain } from "./rain.js";

import { sound } from "../../sound.js";

var rainSound = new sound("./assets/5_bridge/rain_short.mp3", false);

var arrowsKeys = new Image();
arrowsKeys.src = "./assets/5_bridge/arrows.png";

var circleD = 0;
var start = false;

var colSize = 2;
var columns = canvas.width / colSize;
var y =  Array(columns).fill(0);
var yIndex = [...Array(columns).keys()];

window.addEventListener('mousedown', function () {
  rainSound.play();
  rainSound.volume(1);
  startGame();
})

export function startLevel(ctx, game, dino) {

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  ctx.drawImage(arrowsKeys, 545, 155, 160 * 0.7, 114 * 0.7);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.start) {
    
    generateBackground(ctx, game);
    drawDinoPiano(ctx, dino);

    generateBridge(ctx);
    generatePiano(ctx, game.frame);
    generateRain(ctx, game);

    ctx.fillStyle = "white";

    for (let i = 0; i < columns; i++) {
      if (y[i] != 0 && y[i] < 400) {
        y[i] += 6;
      }
      ctx.fillRect(i * colSize, y[i], colSize, 400);
    }

    var cols = [];
    for (let i= 0; i < 4; i++)  {
      cols.push(Math.floor(Math.random() * yIndex.length));
    }

    cols.forEach((col, i) => {
      if (y[yIndex[col]] === 0) {
        y[yIndex[col]] += 6;
      }
      yIndex.splice(col, 1);
    });
  }
}

function startGame() {
  start = true;
};
