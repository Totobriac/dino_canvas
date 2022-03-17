import { startLevel0 } from "./levels/0_desert_level/startLevel0.js";
import { startLevel1 } from "./levels/1_plane_level/startLevel1.js";
import { startLevel2 } from "./levels/2_restaurant_level/startLevel2.js";
import { startLevel3 } from "./levels/3_kitchen_level/kitchenTop.js";
import { startLevel4 } from "./levels/4_submarine_level/startLevel4.js";
import { startLevel5 } from "./levels/5_bridge_level/startLevel5.js";
import { startLevel6 } from "./levels/6_race_level/startLevel6.js";
import { startLevel7 } from "./levels/7_mansion_level/startLevel7.js";
import { startLevel8 } from "./levels/8_zeldouille_level/startLevel8.js";
import { startLevel9 } from "./levels/9_dinoStein_level/startLevel9.js";

export function anim(game, dino, ctx) {

  game.isPlaying = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game.isPlaying === true) {
    game.frame++;
    game.score++;
  }
  switch (game.level) {
    case 0:
      startLevel0(ctx, game, dino);
      break;
    case 1:
      startLevel1(ctx, game, dino);
      break;
    case 2:
      startLevel2(ctx, game, dino);
      break;
    case 3:
      startLevel3(game, ctx);
      break;
    case 4:
      startLevel4(ctx, game, dino);
      break;
    case 5:
      startLevel5(ctx, game, dino);
      break;
    case 6:
      startLevel6(game, ctx);
      break;
    case 7:
      startLevel7(ctx, game);
      break;
    case 8:
      startLevel8(game, ctx);
      break;
    case 9:
      startLevel9(game, ctx);
      break;
  }

}
