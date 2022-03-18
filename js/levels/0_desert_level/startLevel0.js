import { createCactus } from "./cactus.js";
import { drawBack } from "./desertBack.js";
import { drawDinoDesert } from "./desert_dino.js";


export function startLevel(ctx, game, dino) {
  drawBack(ctx, game, dino);
  createCactus(game,dino, ctx);
  drawDinoDesert(ctx, dino, game);
}
