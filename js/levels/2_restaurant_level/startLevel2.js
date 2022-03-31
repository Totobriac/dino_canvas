import { top, left } from "../../script.js";
import { generateRestBack, dinoEntrance } from "./restBack.js";
import { generatePlates } from "./plates.js";
import { generateNote } from "./notepad.js";
import { drawDinoWaiter } from "./waiter.js";

var upDownKeys = new Image();
upDownKeys.src = "./assets/1_plane/keys.png";

var circleD = 0;
var startAnim = false;

var winHeight = window.innerHeight;
var newHeight = winHeight - top - 3;

var winWidth = window.innerWidth;

var canvasStyle = document.body.style;
canvasStyle.setProperty('--canvas-height', newHeight + 'px');
canvasStyle.setProperty('--canvas-width', winWidth + 'px');

canvas.height = newHeight;
canvas.width = winWidth;

var startAttending = false;
var isReady = false;

export function startLevel(ctx, game, dino) {

  if (circleD < 60 && !startAnim) circleD += 0.5;
  if (circleD >= 0.5 && startAnim) circleD -= 0.5;
  if (circleD === 0 && startAnim) game.start = true;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(upDownKeys, 575 + left, 143, 77 * 0.7, 171 * 0.7);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602 + left, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.keyDown && (game.keyDown.code === "ArrowLeft" || game.keyDown.code === "ArrowRight")) startAnim = true;

  if (game.start) {
    dino.y = 300;
    generateRestBack(ctx, game, left);
    dinoEntrance(ctx, left);

    if (startAttending) {
      generateNote(ctx, game);
      if (isReady) {
        generatePlates(ctx, game.frame, dino);
        drawDinoWaiter(ctx, dino, game);
      }
    }
  }
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, left, 400);
  ctx.fillRect(1200 + left, 0, left, 400)
  ctx.restore();
}

function attends() {
  startAttending = true;
}

function ready() {
  isReady = true;
}

export { newHeight, attends, ready };
