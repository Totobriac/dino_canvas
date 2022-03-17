import { createCactus } from "./cactus.js";
import { generateBack } from "./desertBack.js";
import { drawDinoDesert } from "./desert_dino.js";


export function startLevel(ctx, game, dino) {
  generateBack(ctx, game, dino);
  createCactus(game,dino, ctx);
  drawDinoDesert(ctx, dino, game);
}
