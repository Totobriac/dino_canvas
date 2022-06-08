import { dino, rmSprite } from "./gameMecanic.js";
import * as sprite from "./outside_sprite.js";
import { Sprite } from "./sprite.js";
import { ropeSet, isTinAttached, isLidAttached, isPushing, isPulling, isFishInside, triggerTrap } from "./actions.js";


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

var trashMaskSprite = new Image();
trashMaskSprite.src = "./assets/7_mansion/trash_mask.png";


var rope = new Sprite("corde", rope, 512, 152, 1, 1, 70, 530, 0.5, false);
var trapSet = new Sprite("corde", ropeTrapSet, 512, 152, 1, 1, 70, 530, 0.5, false);
var ropeAnim = new Sprite("corde", ropeAnimation, 512, 152, 8, 8, 70, 530, 0.5, false);
var ropeAnimUp = new Sprite("corde", ropeAnimationUp, 512, 152, 4, 4, 70, 530, 0.5, false, false);
var attachedLid = new Sprite("couvercle", lidSprite, 512, 338, 1, 1, 150, 89, 0.35, true);
var canWater = new Sprite("boite de conserve pleine", canFull, 500, 240, 1, 1, 140, 120, 0.3, false);


var isTrapReady = false;
var isTrapReady = false;
var trashInPlace = false;

function drawTrap(ctx) {

  if (isPushing && sprite.trash.x > 500 || isPulling && sprite.trash.x > 500) {
    sprite.trash.update(-1, 0);
    sprite.lid.update(-1, 0);
    dino.update(-1, 0);
    isPushing ? dino.isPushing = true : dino.isPulling = true;
  } else if (sprite.trash.x === 500) {
    dino.isPushing = false;
    dino.isPulling = false;
    trashInPlace = true;
    ctx.drawImage(trashMaskSprite, 500,310);
  }

  if (ropeSet) rope.draw(ctx);

  if (isTinAttached) {
    if (!canWater.checkCollision(0, 330, canvas.width, 50)) {
      ropeAnim.draw(ctx);
      attachedLid.update(0, -1.8);
      canWater.update(0, 2);
    } else {
      if (!triggerTrap) trapSet.draw(ctx);
    }
    if (!triggerTrap) canWater.draw(ctx);
  }

  if (isLidAttached) attachedLid.draw(ctx);

  if (isLidAttached && isTinAttached) rmSprite("corde");

  if (trashInPlace && isFishInside && isLidAttached && isTinAttached) isTrapReady = true;

  if (isTrapReady && triggerTrap) {
    ropeAnimUp.draw(ctx);
    if (attachedLid.y < 298) attachedLid.update(0, 1);
  }
}

export { isTrapReady, drawTrap, rope, canWater };
