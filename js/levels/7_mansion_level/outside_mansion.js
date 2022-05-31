import { dino, rmSprite, drawText } from "./gameMecanic.js";
import * as sprite from "./outside_sprite.js";
import { drawCat, cat } from "./cat.js";

import { isReadingPoster,  hasTape } from "./actions.js";

var sprites  =
  [cat, sprite.lid, sprite.light1, sprite.trash, sprite.ring, sprite.gate,
  sprite.smallPoster, sprite.lionHead, sprite.bowl, sprite.ivy];

var trapSet = false;
var isLidAttached = false;
var isTinAttached = false;
var isAnimated = true;
var isFishInside = false;
export var isTrapReady = false;
var isCatFree = true;
var cutTheRope = false;
var isCatCaught = false;

var oldSprites = [];

export function drawOutsideScenery(ctx) {

  sprite.drawSetting(ctx);

  drawCat(ctx);

  if (trapSet && !isTinAttached) {
    sprite.trap.draw(ctx);
  }

  if (isTinAttached && !isAnimated && !cutTheRope) {
    sprite.trapSet.draw(ctx);
  }

  var stopAnimation = sprite.canWater.checkCollision(0, 330, canvas.width, 50);

  var isCuttingRope = cat.checkCollision(sprite.ropeAnim.x, 0, sprite.ropeAnim.spriteWidth, canvas.height);

  if (stopAnimation) isAnimated = false;

  if (isCuttingRope) cutTheRope = true;

  if (isTinAttached) sprite.canWater.draw(ctx);

  if (isTinAttached && isAnimated) {
    sprite.ropeAnim.draw(ctx);
    sprite.attachedLid.update(0, -2);
    sprite.canWater.update(0, 2);
  }

  var isLidOn = sprite.attachedLid.checkCollision(0, sprite.trash.y, canvas.width, 10);
  if (isLidOn && cutTheRope) isCatCaught = true;

  if (cutTheRope && !isCatCaught) {
    sprite.ropeAnimUp.draw(ctx);
    sprite.lid.update(0, 1);
  }

  if (isFishInside && dino.x > 750) {
    isTrapReady = true;
  }

  if (isLidAttached) sprite.attachedLid.draw(ctx);

  if (isReadingPoster) {
    ctx.drawImage(sprite.wallSprite, 0, 0, 900, 400);
    sprite.bigPoster.draw(ctx);
    ctx.save();
    ctx.translate(290, 30);
    ctx.rotate(4 * Math.PI / 180);
    sprite.bigAnnounce.draw(ctx);
    ctx.fillStyle = "rgba(225,225,225,0.6)";
    ctx.fillRect(10, -10, 200, 20);
    if (!hasTape) {
      ctx.fillRect(10, 265, 200, 20);
      ctx.fillRect(-5, 25, 20, 250);
      ctx.fillRect(195, 20, 20, 250);
    };
    ctx.restore();
    if (oldSprites.length === 0) oldSprites = sprites;
    sprites = [sprite.announce, sprite.bigPoster];
  } else {
    if (oldSprites.length > 0) sprites = oldSprites;
  }

}

export { sprites, isReadingPoster };
