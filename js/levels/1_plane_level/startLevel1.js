import { drawPlane } from "./plane.js";
import { animateMonument } from "./ground.js";
import { generateClouds } from "./clouds.js";
import { createBirds } from "./bird.js";

var upDownKeys = new Image();
upDownKeys.src = "./assets/1_plane/keys.png";

var startAnim = false;

export function startLevel(ctx, game, dino) {

  if (game.start) {
    drawPlane(ctx, dino);
    animateMonument(ctx);
    createBirds(ctx, game);
    generateClouds(ctx, game);
  }

  if (game.keyDown && game.keyDown.code === "Space") startAnim = true;

  if (!game.start && !game.levelDone) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(upDownKeys, 800, 160, 77 * 0.7, 171 * 0.7);
  }
  if (startAnim) anim(game);
}


function anim(game) {
  game.start = true
}

