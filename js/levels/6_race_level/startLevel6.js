import { generateRoad, drawScenery } from "./road.js";

export function startLevel(game, ctx) {
  generateRoad(game);
  drawScenery(ctx, game);
}
