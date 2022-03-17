import { initMaze, maze } from "./raycasting.js";

export function startLevel(game, ctx) {
  initMaze(game, ctx);
  maze(ctx);
}
