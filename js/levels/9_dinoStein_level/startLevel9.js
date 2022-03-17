import { initMaze, maze } from "./raycasting.js";

export function startLevel9(game, ctx) {
  initMaze(game, ctx);
  maze(ctx);
}
