import { generateBackground } from "./nuit_etoilée.js";
import { drawDinoPiano } from "./dino_piano.js";
import { generateBridge } from "./bridge.js";
import { generatePiano } from "./piano.js";
import { generateRain } from "./rain.js";

var arrowsKeys = new Image();
arrowsKeys.src = "./assets/5_bridge/arrows.png";

var circleD = 0;
var start = false;
var getData = false;
var imgData;
var imageData;

var tempCanvas = document.createElement('canvas');
tempCanvas.width = 1200;
tempCanvas.height = 400;
var tempContext = tempCanvas.getContext('2d');

tempContext.fillStyle = "white";
tempContext.fillRect(0, 0, 1200, 400);

imageData = tempContext.getImageData(0, 0, canvas.width, canvas.height);


window.addEventListener('mousedown', function () {
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
    console.log(imageData.data.length);

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255;
      imageData.data[i + 1] = 255;
      imageData.data[i + 2] = 255;
      imageData.data[i + 3] = 255;
    }

    tempContext.putImageData(imageData, 0, 0);

    var img = new Image();
    img.src = tempCanvas.toDataURL();
    ctx.drawImage(tempCanvas, 0, 0);

  }
}

function startGame() {
  start = true;
};
