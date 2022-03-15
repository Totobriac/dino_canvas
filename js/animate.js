import { startLevel0 } from "./0_desert_level/startLevel0.js";
import { startLevel1 } from "./1_plane_level/startLevel1.js";
import { startLevel2 } from "./2_restaurant_level/startLevel2.js";
import { startLevel3 } from "./3_kitchen_level/kitchenTop.js";
import { startLevel4 } from "./4_submarine_level/startLevel4.js";
import { startLevel5 } from "./5_bridge_level/startLevel5.js";
import { startLevel6 } from "./6_race_level/startLevel6.js";
import { startLevel7 } from "./7_mansion_level/startLevel7.js";
import { startLevel8 } from "./8_zeldouille_level/startLevel8.js";

import { initMaze, maze } from "./dino_stein/raycasting.js";




export function anim(game, dino, ctx) {

  game.isPlaying = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game.isPlaying === true) {
    game.frame++;
    game.score++;
  }
  if (game.level === 0) {
    startLevel0(ctx, game, dino);
  }
  else if (game.level === 1) {
    startLevel1(ctx, game, dino);
  }
  else if (game.level === 2) {
    startLevel2(ctx, game, dino);
  }
  else if (game.level === 3) {
    startLevel3(game, ctx);
  }
  else if (game.level === 4) {
    startLevel4(ctx, game, dino);
  }
  else if (game.level === 5) {
    startLevel5(ctx, game, dino);
  }
  else if (game.level === 6) {
    startLevel6(game, ctx);
  }
  else if(game.level === 7) {
    startLevel7(ctx, game);
  }
  else if(game.level === 8) {
    startLevel8(game, ctx);
  }
  else if (game.level === 9) {
    initMaze(game, ctx);
    maze(ctx);
  }

  else if(game.level === 8) {

  }
}
