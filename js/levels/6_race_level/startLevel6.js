import { generateRoad, drawScenery } from "./road.js";

export function startLevel6(game, ctx) {
  generateRoad(game);
  drawScenery(ctx);
}
