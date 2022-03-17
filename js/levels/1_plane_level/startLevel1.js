import { drawPlane } from "./plane.js";
import { animateMonument } from "./ground.js";
import { generateClouds } from "./clouds.js";
import { createBirds } from "./bird.js";

export function startLevel(ctx, game, dino) {
  drawPlane(ctx, dino);
  animateMonument(ctx);
  createBirds(ctx, game);
  generateClouds(ctx, game);
}
