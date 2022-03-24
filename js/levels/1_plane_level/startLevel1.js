import { drawPlane, startFlying } from "./plane.js";
import { animateMonument } from "./ground.js";
import { generateClouds } from "./clouds.js";
import { createBirds } from "./bird.js";

var upDownKeys = new Image();
upDownKeys.src = "./assets/1_plane/keys.png";

var circleD = 0;
var startAnim = false;
var offset = 0;

export function startLevel(ctx, game, dino) {

  if (game.start) {
    drawPlane(ctx, dino);
    animateMonument(ctx);
    createBirds(ctx, game);
    generateClouds(ctx, game);

    ctx.fillStyle = "white";
    if (offset < canvas.width) {
      offset += 18;
    } else {
      startFlying();
    }
    ctx.fillRect(offset, 0, canvas.width, canvas.height);
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

