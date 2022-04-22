import { drawStove } from "./tools/stove.js";
import { drawTools, sink, displayTool } from "./tools.js";
import { setControls } from "./control.js";
import { generateTable } from "./tools/table.js";
import { top } from "../../script.js";
import { drawBubbles } from "./bubbleIntro.js";
import { playSound, stopSound } from "./sound.js";
import { sound } from "../../sound.js";
import { src } from "./syphonSrc.js";

var ambianceSound = new sound("../assets/3_kitchen/sounds/ambiance.mp3", true);

var canvasStyle = document.body.style;
canvasStyle.setProperty('--canvas-height', '400px');
canvasStyle.setProperty('--canvas-width', '1200px');
canvasStyle.setProperty('--canvas-top', '0px');
canvasStyle.setProperty('--canvas-top', top + 'px');

var mouseKeys = new Image();
mouseKeys.src = "./assets/3_kitchen/left_mouse.png";

var backSprite = new Image();
backSprite.crossOrigin = '*'
backSprite.src = "./assets/3_kitchen/back.png";

var syphonSprite = new Image();
syphonSprite.src = src;

canvas.height = 400;
canvas.width = 1200;

var circleD = 0;
var start = false;

var mask = true;

var levelDone = false;

var ambianceVol = 0;

var zoomTick = 0;
var finalRadius = 650;

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
    if (ambianceVol < 0.15) ambianceVol += 0.0001;

    playSound(ambianceSound, ambianceVol);
    setControls();
    generateTable(ctx);
    if (sink) sink.drawSink(ctx);
    drawStove(ctx);

    if (!mask) {
      drawTools(ctx, game);
     
      if (levelDone) {
        if (zoomTick < 495) {
          zoomTick++;
          ctx.translate(-0.32, -0.355)
          ctx.scale(1.004, 1.004);
        } else {          
          displayTool([])
          mask = true;
        }
      }
    }

    if (mask) {
      if (!levelDone) {
        ctx.drawImage(backSprite, 0, 0);
        ctx.save();
        ctx.globalCompositeOperation = 'destination-in';
        drawBubbles(ctx, 1);
        ctx.restore();
      } else {
        if (finalRadius >= 2) {
          finalRadius -= 2;
          if (ambianceVol >= 0.0001) ambianceVol -= 0.0001
        } else {
          ambianceSound.stop();
          game.switchLevel(4);
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "black";
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(syphonSprite, 0, 0);
        ctx.save();
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(594, 198, finalRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    }
  }
}

function startGame() {
  start = true;
};

function removeMask() {
  mask = false;
};

function endLevel() {
  levelDone = true;
}

export { removeMask, endLevel };
