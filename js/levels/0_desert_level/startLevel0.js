import { createCactus } from "./cactus.js";
import { drawBack } from "./desertBack.js";
import { drawDinoDesert } from "./desert_dino.js";


export function startLevel(ctx, game, dino) {
  drawBack(ctx, game, dino);
  createCactus(game, dino, ctx);
  drawDinoDesert(ctx, dino, game);

  if (game.keyDown && game.keyDown.code === "Space") game.start = true;
  if (!game.start) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}