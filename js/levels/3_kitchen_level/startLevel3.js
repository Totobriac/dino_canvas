import {
  drawStove
} from "./tools/stove.js";
import {
  drawTools,
  sink
} from "./tools.js";
import {
  setControls
} from "./control.js";
import {
  generateTable
} from "./tools/table.js";
import {
  top
} from "../../script.js";
import {
  drawBubbles
} from "./bubbleIntro.js";

var canvasStyle = document.body.style;
canvasStyle.setProperty('--canvas-height', '400px');
canvasStyle.setProperty('--canvas-width', '1200px');
canvasStyle.setProperty('--canvas-top', '0px');
canvasStyle.setProperty('--canvas-top', top + 'px');

var rightLeftKeys = new Image();
rightLeftKeys.src = "./assets/3_kitchen/left_mouse.png";

var backSprite = new Image();
backSprite.src = "./assets/3_kitchen/back.png";

canvas.height = 400;
canvas.width = 1200;

var circleD = 0;
var start = false;

var mask = true;

window.addEventListener('mousedown', function() {
  startGame();
})

export function startLevel(game, ctx) {

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  ctx.drawImage(rightLeftKeys, 545, 130, 160 * 0.7, 164 * 0.7);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.start) {
    setControls();
    generateTable(ctx);
    if (sink) sink.drawSink(ctx);
    drawStove(ctx);

    if (!mask) drawTools(ctx, game);

    if (mask) {
      ctx.drawImage(backSprite, 0, 0);
      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      drawBubbles(ctx);
      ctx.restore();
    }
  }
}

function startGame() {
  start = true
};

function drawMask() {
  mask = true;
}
