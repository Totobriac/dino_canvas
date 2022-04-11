import {
  top,
  left
} from "../../script.js";
import {
  generateRestBack
} from "./restBack.js";
import {
  generatePlates,
  drawTrash
} from "./plates.js";
import {
  generateNote
} from "./notepad.js";
import {
  drawDinoWaiter
} from "./waiter.js";
import {
  dinoAnim
} from "./dinoAnimation.js";
import {
  generateConfettis,
  celebrate
} from "./confetti.js";
import {
  drawOpening
} from "./opening.js";

import {
  sound
} from "../../sound.js";
var music = new sound("../assets/2_restaurant/velvet.mp3");

var rightLeftKeys = new Image();
rightLeftKeys.src = "./assets/2_restaurant/keys_r_l.png";

var winHeight = window.innerHeight;
var newHeight = winHeight - top - 3;

var winWidth = window.innerWidth;

var canvasStyle = document.body.style;
canvasStyle.setProperty('--canvas-height', winHeight + 'px');
canvasStyle.setProperty('--canvas-width', winWidth + 'px');
canvasStyle.setProperty('--canvas-top', '0px');

canvas.height = winHeight;
canvas.width = winWidth;

var circleD = 0;
var startAnim = false;
var startAttending = false;
var confettis = false;
var celebration = false;
var animated = true;

var endHeight = 400;
var endWidth = 1200;
var endX = left;
var endY = top;

export function startLevel(ctx, game, dino) {

  if (!confettis) {
    dino.updateState("waiting");
    generateConfettis(ctx);
    confettis = true;
  }

  if (circleD < 60 && !startAnim) circleD += 0.5;
  if (circleD >= 0.5 && startAnim) circleD -= 0.5;
  if (circleD === 0 && startAnim) game.start = true;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(rightLeftKeys, 542 + left, 177 + top, 171 * 0.7, 77 * 0.7);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602 + left, 203 + top, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.keyDown && (game.keyDown.code === "ArrowLeft" || game.keyDown.code === "ArrowRight")) startAnim = true;

  if (game.start) {

    if (animated) {
      music.volume(1);
      music.play();
      drawOpening(ctx, left, top);
    } else {
      generateRestBack(ctx, game, left);
      dinoAnim(ctx, left, newHeight);
      drawTrash(ctx);
      if (startAttending) {
        generateNote(ctx, game);
        if (dino.state === "working") {
          drawDinoWaiter(ctx, dino, game);
          generatePlates(ctx, game.frame, dino);
        }
      }
    }
  }

  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, winWidth, top);
  ctx.fillRect(0, 0 + top, left, 400);
  ctx.fillRect(1200 + left, top, left, 400);
  ctx.restore();

  if (celebration) celebrate();

  if (dino.state === "levelEnd") {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    endWidth -= 1.8;
    endHeight -= 0.5;
    endX += 1.25;
    endY += 0.3;
    ctx.fillRect(endX, endY, endWidth, endHeight);
    ctx.restore();
  }
}

function attends() {
  startAttending = true;
}

function serviceOver() {
  startAttending = false;
}

function startCelebration() {
  celebration = true;
}

function endAnimation() {
  animated = false;
}


export {
  newHeight,
  attends,
  winWidth,
  winHeight,
  startCelebration,
  serviceOver,
  endAnimation,
};
