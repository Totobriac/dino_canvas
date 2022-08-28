import { drawSubmarine } from "./submarine.js";
import { generateMines, handleExplosion } from "./mines.js";
import { generateEyes } from "./eyes.js";
import { tick } from "./tunnel.js";
import { generateBubbles, endBubbles } from "./bubbles.js";
import { generateShark } from "./shark.js";
import { drawCounter } from "./counter.js";
import { drawFinalScene } from "./finalScene.js";

import { sound } from "../../sound.js";

var mouseKeys = new Image();
mouseKeys.src = "./assets/3_kitchen/left_mouse.png";

var prayerSound = new sound("./assets/4_submarine/prayer2.mp3");
var splashSound = new sound("./assets/4_submarine/splash.wav");

var circleD = 0;
var start = false;
var isDiving = false;
var splash = false;
var vol = 1;

var curtain1 = {
  x: -600,
  y: 0,
  height: 400,
  width: 600,
  isOpen: true,
}

var curtain2 = {
  x: 1200,
  y: 0,
  height: 400,
  width: 600,
  isOpen: true,
}

function closeCurtain() {
  curtain1.x < 0 ? curtain1.x += 2 : curtain1.isOpen = false;
  curtain2.x > 600 ? curtain2.x -= 2 : curtain2.isOpen = false;
}

window.addEventListener('mousedown', function () {
  startGame();
})

export function startLevel(ctx, game, dino) {

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
    if (!game.levelDone) {
      prayerSound.volume(vol);
      prayerSound.play();
      if (!isDiving) tick(ctx);
      if (isDiving) {
        splashSound.volume(1);
        if (!splash) {
          splashSound.play();
          splash = true;
        }
        generateEyes(game, ctx, dino);
        drawSubmarine(ctx, dino, game.mousePosition);
        if (endBubbles) {

          handleExplosion();
          game.score += 0.025;
          generateShark(dino, game, ctx);
          generateMines(ctx, game, dino);
          if (game.score <= 52)drawCounter(game, ctx);
        }
        generateBubbles(ctx);

        ctx.fillStyle = "black";
        ctx.fillRect(curtain1.x, curtain1.y, curtain1.width, curtain1.height);
        ctx.fillRect(curtain2.x, curtain2.y, curtain2.width, curtain2.height);
      }
      if (game.score >= 52) {        
        curtain1.isOpen ? closeCurtain() : game.levelDone = true;
        vol > 0.1 ? vol -= 0.01 : prayerSound.stop();
      }
    } else {
      drawFinalScene(ctx, game);
    }
  }
}

function startGame() {
  start = true;
};

function dive() {
  isDiving = true;
}

export { dive };
