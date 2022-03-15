import { generateRain } from "./nuit_etoilée.js";
import { drawDinoPiano } from "./dino_piano.js";
import { generateBridge } from "./bridge.js";
import { generatePiano } from "./piano.js";


export function startLevel5(ctx, game, dino) {
  generateRain(ctx, game);
  drawDinoPiano(ctx, dino);
  generateBridge(ctx);
  generatePiano(ctx, game.frame);
}
