import { dino, rmSprite } from "./gameMecanic.js";
import * as sprite from "./outside_sprite.js";

var isReadingPoster = false;
var sprites  = [sprite.cat, sprite.lid, sprite.light1, sprite.trash, sprite.ring, sprite.gate, sprite.smallPoster, sprite.lionHead, sprite.bowl, sprite.ivy];
var isDinoLeft = false;
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
var isTrapReady = false;
var catOnTheFloor = false;
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


  ctx.drawImage(sprite.skySprite, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(sprite.hillSprite, 0, -50, 1200, 578);
  ctx.drawImage(sprite.mansionLightSprite, 650, 0, 130, 144);
  ctx.drawImage(sprite.mansionSprite, 650, 0, 130, 144);
  ctx.drawImage(sprite.moonLightSprite, 85, 55, 80, 80);
  ctx.drawImage(sprite.moonSprite, 100, 70, 50, 50);
  ctx.fillStyle = ("grey");
  ctx.fillRect(0, 360, canvas.width, 40);

  ctx.drawImage(sprite.wallSprite, 0, 200, 160, 160);
  ctx.drawImage(sprite.wallSprite, 160, 200, 160, 160);
  ctx.drawImage(sprite.wallSprite, 552, 200, 160, 160);
  ctx.drawImage(sprite.wallSprite, 712, 200, 160, 160);
  ctx.drawImage(sprite.wallSprite, 872, 200, 160, 160);

  sprite.light1.draw(ctx);
  sprite.light2.draw(ctx);


  sprite.gate.draw(ctx);

  sprite.smallPoster.draw(ctx);

  ctx.save();
  ctx.translate(740, 230);
  ctx.rotate(4 * Math.PI / 180);
  sprite.smallAnnounce.draw(ctx);
  ctx.restore();

  if (isTrapReady === false) {
    if (isDinoLeft == true) {
      if (sprite.cat.x == -25) sprite.cat.sprite = sprite.catSitLeft;
      if (sprite.cat.x > -25 && sprite.cat.x < 230) sprite.cat.sprite = sprite.catWalkRight;
      if (sprite.cat.x == 230) sprite.cat.sprite = sprite.catSitRight;
    }
    else {
      if (sprite.cat.x == -25) sprite.cat.sprite = sprite.catSitLeft;
      if (sprite.cat.x > -25 && sprite.cat.x < 230) sprite.cat.sprite = sprite.catWalkLeft;
    }
  } else {
    if (sprite.cat.y < 315 && catOnTheFloor === false) {
      sprite.cat.sprite = sprite.flyingCat;
      sprite.cat.frames = 1;
      sprite.cat.columns = 1;
      sprite.cat.update(1, 2.5);
    }
    else {
      catOnTheFloor = true;
      if (sprite.cat.x < 300) {
        sprite.cat.sprite = sprite.runningCat;
        sprite.cat.frames = 16;
        sprite.cat.columns = 4;
        sprite.cat.update(1, 0);
      }
      else if (sprite.cat.x < 420) {
        sprite.cat.sprite = sprite.flyingCat;
        sprite.cat.frames = 1;
        sprite.cat.columns = 1;
        sprite.cat.update(1, -1);
      }
      else {
        sprite.cat.sprite = sprite.divingCat;
        sprite.cat.update(0.5, 1.5);
        if (sprite.cat.y > 300) {
          isCatFree = false;
        }
      }
    }
  }

  sprite.ivy.draw(ctx);

  if (isCatFree === true) sprite.cat.draw(ctx);

  isRunningWater === true ? sprite.lionHead.draw(ctx) : sprite.lionHeadSc.draw(ctx);

  if (isRunningWater === true) sprite.runningWater.draw(ctx);

  if (hasWater === true) {
    sprite.fish.draw(ctx);
    isRunningWater === true ? sprite.bubble.draw(ctx) : sprite.noBubble.draw(ctx);
  }

  sprite.bowl.draw(ctx);

  sprite.trash.draw(ctx);

  if (hasLid === false) sprite.lid.draw(ctx);

  if (trapSet === true && isTinAttached === false) {
    sprite.trap.draw(ctx);
  }


  if (isTinAttached  && isAnimated === false && cutTheRope == false) {
    sprite.trapSet.draw(ctx);
  }

  var stopAnimation = sprite.canWater.checkCollision(0, 330, canvas.width, 50);

  var isCuttingRope = sprite.cat.checkCollision(sprite.ropeAnim.x, 0, sprite.ropeAnim.spriteWidth, canvas.height);

  if (stopAnimation) isAnimated = false;

  if (isCuttingRope) cutTheRope = true;

  if (isTinAttached) sprite.canWater.draw(ctx);

  if (isTinAttached && isAnimated === true) {
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

  sprite.ring.draw(ctx);

  sprite.sign.draw(ctx);


  !isTrapReady ? dodgyCat() : catToTrap();


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

function dodgyCat() {
  if (dino.x < 150) {
    isDinoLeft = true;
    if (sprite.cat.x < 230) {
      sprite.cat.update(3, 0);
    }
  }
  else {
    isDinoLeft = false;
  }
  if (isDinoLeft == false) {
    if (sprite.cat.x > -25) {
      sprite.cat.update(-3, 0);
    }
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

function catToTrap() {
  sprite.cat.sprite = sprite.catWalkRight;
  sprite.cat.update(2, 0);
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
