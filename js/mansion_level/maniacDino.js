import { trash } from "./outside_mansion.js";
import { MansionDino } from "../character/mansionDino.js";

var dino;
var trashCollision = false;

export function generateDino(ctx, game) {

  if (game.level8Dino == false) {
    dino = new MansionDino(ctx, 820, 300, 90, 99);
    game.level8Dino = true;
  }
  trashCollision = trash.checkCollision(dino.x, dino.y, dino.spriteWidth * dino.scale, dino.spriteHeight * dino.scale);
  dino.moveAround(game, trashCollision, trash);
  dino.checkBundaries(820, 0, 295, 320);
  dino.animateDino();
}
