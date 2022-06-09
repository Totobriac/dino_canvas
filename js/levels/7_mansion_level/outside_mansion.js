import * as sprite from "./outside_sprite.js";
import { drawCat, cat } from "./cat.js";
import { drawTrap } from "./trap.js";
import { isReadingPoster } from "./actions.js";

var sprites  =
  [ sprite.lid, sprite.light1, sprite.trash, sprite.ring, sprite.gate,
  sprite.smallPoster, sprite.lionHead, sprite.bowl, sprite.ivy, cat];


var oldSprites = [];

export function drawOutsideScenery(ctx) {

  sprite.drawSetting(ctx);

  drawCat(ctx);

  drawTrap(ctx);

  if (isReadingPoster) {
    sprite.drawBigPosters(ctx);
    if (oldSprites.length === 0) oldSprites = sprites;
    sprites = [sprite.announce, sprite.bigPoster];
  } else {
    if (oldSprites.length > 0) sprites = oldSprites;
  }

}

export { sprites };
