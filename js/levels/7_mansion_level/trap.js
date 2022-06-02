import { Sprite } from "./sprite.js";
import { ropeSet, isTinAttached, isLidAttached } from "./actions.js";

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
var attachedLid = new Sprite("couvercle", lidSprite, 512, 338, 1, 1, 150, 89, 0.33, true);
var canWater = new Sprite("boite de conserve", canFull, 500, 240, 1, 1, 140, 120, 0.3, false);

var isTrapReady = false;
var isFishInside = false;
export var isTrapReady = false;
var isCatFree = true;
var cutTheRope = false;
var isCatCaught = false;


export function drawTrap(ctx) {

  if (ropeSet) rope.draw(ctx);

  if (isTinAttached) {
    if (!canWater.checkCollision(0, 330, canvas.width, 50)) {
      ropeAnim.draw(ctx);
      attachedLid.update(0, -1.8);
      canWater.update(0, 2);
    } else {
      trapSet.draw(ctx);
    }
    canWater.draw(ctx);    
  }

  if (isLidAttached) attachedLid.draw(ctx);
}

//
// var isCuttingRope = cat.checkCollision(sprite.ropeAnim.x, 0, sprite.ropeAnim.spriteWidth, canvas.height);

// if (isCuttingRope) cutTheRope = true;



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
