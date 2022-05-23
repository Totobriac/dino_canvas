import { generateRoad, drawScenery } from "./road.js";

export function startLevel(game, ctx) {
  if (game) {
    generateRoad(game);
    drawScenery(ctx, game);
  }
}
