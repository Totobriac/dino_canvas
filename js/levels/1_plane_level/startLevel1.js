import { drawPlane, startFlying } from "./plane.js";
import { animateMonument } from "./ground.js";
import { generateClouds } from "./clouds.js";
import { createBirds } from "./bird.js";

import { sound } from "../../sound.js";
var music = new sound("../assets/1_plane/starman.mp3");

var upDownKeys = new Image();
upDownKeys.src = "./assets/1_plane/keys.png";

var circleD = 0;
var startAnim = false;
var offset = 0;
var alpha = 1;
var vol = 1;
var exit = false;
var exitD = 720;

export function startLevel(ctx, game, dino) {

  if (game.start) {

    music.volume(vol);
    if(!game.levelDone) {
      music.play();
    } else {
      if (vol > 0.01) vol -= 0.01;
    }
    if (game.levelDone && alpha > 0.01) alpha -= 0.01;
    if (alpha === 0) banderazo();
    drawPlane(ctx, dino);
    animateMonument(ctx, game);

    ctx.save();
    ctx.globalAlpha = alpha;
    createBirds(ctx, game);
    generateClouds(ctx, game);
    ctx.restore();

    ctx.fillStyle = "white";
    if (offset < canvas.width) {
      offset += 18;
    } else {
      startFlying();
    }
    ctx.fillRect(offset, 0, canvas.width, canvas.height);

    if (game.score >  4172 ) game.levelDone = true;

    if (exit) {
      exitD > 2 ? exitD -= 2 : game.switchLevel(2);
      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = "#75AADB";
      ctx.beginPath();
      ctx.arc(605, 205, exitD, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }

  }

  if (game.keyDown && (game.keyDown.code === "ArrowUp" || game.keyDown.code === "ArrowDown")) startAnim = true;

  if (!game.start && !game.levelDone) {
    if (circleD < 60 && !startAnim) circleD += 0.5;
    if (circleD >= 0.5 && startAnim) circleD -= 0.5;
    if (circleD === 0 && startAnim) game.start = true;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(upDownKeys, 1100, 260, 77 * 0.7, 171 * 0.7);
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(1127, 320, circleD, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

export function closeLevel() {
  exit = true;
}
