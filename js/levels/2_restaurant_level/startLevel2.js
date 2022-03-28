import { generateRestBack } from "./restBack.js";
import { generatePlates } from "./plates.js";
import {generateNote} from "./notepad.js";
import { drawDinoWaiter } from "./waiter.js";


export function startLevel(ctx, game, dino) {
  dino.y = 300;
  generateRestBack(ctx, game);
  generatePlates(ctx, game.frame, dino);
  drawDinoWaiter(ctx, dino, game);
  generateNote(ctx, game);
}
