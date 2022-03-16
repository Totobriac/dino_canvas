import { drawSubmarine } from "./submarine.js";
import { generateBubbles, handleExplosion } from "./bubbles.js";
import { generateEyes } from "./eyes.js";

export function startLevel4(ctx, game, dino) {
  generateEyes(game, ctx);
  drawSubmarine(ctx, dino, game.mousePosition);
  generateBubbles(ctx, game.frame, dino);
  handleExplosion();
}
