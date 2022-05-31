import { dino, rmSprite } from "./gameMecanic.js";
import * as sprite from "./outside_sprite.js";
import { drawCat, cat } from "./cat.js";

var isReadingPoster = false;
var sprites  = [cat, sprite.lid, sprite.light1, sprite.trash, sprite.ring, sprite.gate, sprite.smallPoster, sprite.lionHead, sprite.bowl, sprite.ivy];
var objects = [];
var hasCan = false;
var hasTape = false;
var hasRope = false;
var isRunningWater = true;
var hasWater = true;
var hasFish = false;
var trapSet = false;
var hasLid = false;
var isLidAttached = false;
var isTinAttached = false;
var isAnimated = true;
var isFishInside = false;
export var isTrapReady = false;
var isCatFree = true;
var cutTheRope = false;
var isCatCaught = false;
var hasSearched = false;

var oldSprites = [];

export function drawOutsideScenery(ctx) {

  if (isReadingPoster) {
    if (oldSprites.length === 0) oldSprites = sprites;
    sprites = [sprite.announce, sprite.bigPoster];
  } else {
    if (oldSprites.length > 0) sprites = oldSprites;
  }

  sprite.drawSetting(ctx);

  drawCat(ctx);

  if (isRunningWater) {
    sprite.lionHead.draw(ctx);
    sprite.runningWater.draw(ctx);
    sprite.bubble.draw(ctx);
  } else {
    sprite.lionHeadSc.draw(ctx);
    sprite.noBubble.draw(ctx);
  }

    sprite.bowl.draw(ctx);

  if (hasWater) {
    sprite.fish.draw(ctx);
   }


  if (!hasLid) sprite.lid.draw(ctx);

  if (trapSet && !isTinAttached) {
    sprite.trap.draw(ctx);
  }

  if (isTinAttached  && !isAnimated && !cutTheRope ) {
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
  if (isLidOn && cutTheRope ) isCatCaught = true;

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
    if (hasTape === false) {
      ctx.fillRect(10, 265, 200, 20);
      ctx.fillRect(-5, 25, 20, 250);
      ctx.fillRect(195, 20, 20, 250);
    };
    ctx.restore();
  }
}

function push() {
  if (dino.x > sprite.trash.x) {
    sprite.trash.update(-2, 0);
    sprite.lid.update(-2,0);
  }
}

function pull() {
  if (dino.x < sprite.trash.x) {
    sprite.trash.update(-2, 0);
    sprite.lid.update(-2,0);
    dino.x -= 2;
  }
}

function grabCan() {
  if (!hasCan && hasLid && hasSearched) {
    objects.push(["boite de conserve", sprite.canSprite]);
    hasCan = true;
  }
}

function grabDuct() {
  if (hasTape === false) {
    objects.push(["boulle de scotch", sprite.ductSprite]);
    hasTape = true;
  }
}

function grabRope() {
  if (hasRope === false) {
    objects.push(["corde", sprite.ropeSprite]);
    hasRope = true;
    rmSprite("plante grimpante")
  }
}

function stopWater() {
  isRunningWater = false;
  removeObject("boulle de scotch");
}

function emptyWater() {
  if (isRunningWater === false) {
    removeObject("boite de conserve");
    hasWater = false;
    objects.push(["boite de conserve", sprite.canSpriteWater]);
  }
}

function grabFish() {
  if (hasFish === false && isRunningWater === false && hasWater === false) {
    objects.push(["poisson", sprite.dyingFish]);
    hasFish = true;
  }
}

function getLid() {
  if (hasLid === false) {
    objects.push(["couvercle", sprite.lidObject]);
    hasLid = true;
    rmSprite("couvercle");
    sprite.trash.name = "poubelle sans couvercle";
  }
}

function attachLid() {
  if (hasLid && trapSet) {
    isLidAttached = true;
    removeObject("couvercle");
  }
}

function attachTin() {
  if (isLidAttached && !isTinAttached && !hasWater) {
    isTinAttached = true;
    removeObject("boite de conserve");
  }
}

function setTrap() {
  trapSet = true;
  removeObject("corde");
}

function leaveFish() {
  removeObject("poisson");
  isFishInside = true;
}

function removeObject(object) {
  for (let i = 0; i < objects.length; i++) {
    if (object === objects[i][0]) {
      objects.splice(i, 1);
    }
  }
}

function readPoster() {
  isReadingPoster = true;
}

function leavePoster() {
  isReadingPoster = false;
}

function searchTrash() {
  if (hasLid) hasSearched = true;
  console.log(hasSearched);
}


var outsideText = [["chat", "Regarder", "Miaou! Miaou!"],
["sonette", "Utiliser", "Bonjour!!"], ["porte", "Ouvrir", "C'est fermé."],
["poubelle", "Regarder", "Peut-être quelque chose a grignoter?"],
["poubelle sans couvercle", "Regarder", "Miam! Une boite de conserve au fond !"]];

var outsideAction = [["Prendre", "poubelle sans couvercle", grabCan],
["Regarder", "poster", readPoster], ["Prendre", "annonce", grabDuct],
["Prendre", "plante grimpante", grabRope], ["Prendre", "bassin", grabFish],
["Prendre", "couvercle", getLid],["Ouvrir", "poubelle", getLid],
["Regarder", "poubelle sans couvercle", searchTrash],
["Pousser", "poubelle", push],
["Pousser", "poubelle sans couvercle", push],
["Tirer", "poubelle", pull],
["Tirer", "poubelle sans couvercle", pull],
];

var outsideObjectAction = [["boulle de scotch", "tête de lion", stopWater], ["boite de conserve", "bassin", emptyWater],
["corde", "lampe", setTrap], ["couvercle", "corde", attachLid], ["boite de conserve", "corde", attachTin],
["poisson", "poubelle", leaveFish]];

export {
  sprites, outsideText, outsideAction, outsideObjectAction, objects,
  isReadingPoster, readPoster, leavePoster,
};
