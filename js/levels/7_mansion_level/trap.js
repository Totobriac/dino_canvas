import { Sprite } from "./sprite.js";
import { ropeSet, isTinAttached } from "./actions.js";

var rope = new Image();
rope.src = "./assets/7_mansion/rope_trap.png";

var ropeTrapSet = new Image();
ropeTrapSet.src = "./assets/7_mansion/rope_trap_set.png";

var ropeAnimation = new Image();
ropeAnimation.src = "./assets/7_mansion/rope_anim.png";

var ropeAnimationUp = new Image();
ropeAnimationUp.src = "./assets/7_mansion/rope_up.png";

var lidSprite = new Image();
lidSprite.src = "./assets/7_mansion/trash_lid.png";

var canFull = new Image();
canFull.src = "./assets/7_mansion/full_tin.png";

export var rope = new Sprite("corde", rope, 512, 152, 1, 1, 70, 530, 0.5, false);
var trapSet = new Sprite("corde", ropeTrapSet, 512, 152, 1, 1, 70, 530, 0.5, false);
var ropeAnim = new Sprite("corde", ropeAnimation, 512, 152, 8, 8, 70, 530, 0.5, false);
var ropeAnimUp = new Sprite("corde", ropeAnimationUp, 512, 152, 8, 8, 70, 530, 0.5, false);
var attachedLid = new Sprite("couvercle", lidSprite, 512, 338, 1, 1, 512, 512, 0.125, true);
var canWater = new Sprite("boite de conserve", canFull, 500, 240, 1, 1, 140, 120, 0.3, false);


export function drawTrap(ctx) {
  if (ropeSet) rope.draw(ctx);

  if (isTinAttached) trapSet.draw(ctx);
}

// if (trapSet && !isTinAttached) {
//   sprite.trap.draw(ctx);
// }
//
// if (isTinAttached && !isAnimated && !cutTheRope) {
//   sprite.trapSet.draw(ctx);
// }
//
// var stopAnimation = sprite.canWater.checkCollision(0, 330, canvas.width, 50);
//
// var isCuttingRope = cat.checkCollision(sprite.ropeAnim.x, 0, sprite.ropeAnim.spriteWidth, canvas.height);
//
// if (stopAnimation) isAnimated = false;
//
// if (isCuttingRope) cutTheRope = true;
//
// if (isTinAttached) sprite.canWater.draw(ctx);
// if (isLidAttached) sprite.attachedLid.draw(ctx);
//
//
// if (isTinAttached && isAnimated) {
//   sprite.ropeAnim.draw(ctx);
//   sprite.attachedLid.update(0, -2);
//   sprite.canWater.update(0, 2);
// }
//
// var isLidOn = sprite.attachedLid.checkCollision(0, sprite.trash.y, canvas.width, 10);
// if (isLidOn && cutTheRope) isCatCaught = true;
//
// if (cutTheRope && !isCatCaught) {
//   sprite.ropeAnimUp.draw(ctx);
//   sprite.lid.update(0, 1);
// }
//
// if (isFishInside && dino.x > 750) {
//   isTrapReady = true;
// }
