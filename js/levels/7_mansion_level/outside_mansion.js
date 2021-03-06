import { dino } from "./gameMecanic.js";
import * as sprite from "./outside_sprite.js";

var isReadingPoster = false;
var sprites;
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


export function drawOutsideScenery(ctx) {

  isReadingPoster === false ? sprites = [sprite.cat, sprite.lid, sprite.light1, sprite.trash, sprite.ring, sprite.trap, sprite.gate, sprite.smallBowie, sprite.lionHead, sprite.bowl, sprite.ivy] : sprites = [sprite.bigBowie];

  ctx.drawImage(sprite.skySprite, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(sprite.hillSprite, 0, -50, 1200, 578);
  ctx.drawImage(sprite.mansionLightSprite, 650, 0, 130, 144);
  ctx.drawImage(sprite.mansionSprite, 650, 0, 130, 144);
  ctx.drawImage(sprite.moonLightSprite, 85, 55, 80, 80);
  ctx.drawImage(sprite.moonSprite, 100, 70, 50, 50);
  ctx.fillStyle = ("grey");
  ctx.fillRect(0, 370, canvas.width, 30);

  ctx.drawImage(sprite.wallSprite, 0, 210, 160, 160);
  ctx.drawImage(sprite.wallSprite, 160, 210, 160, 160);
  ctx.drawImage(sprite.wallSprite, 552, 210, 160, 160);
  ctx.drawImage(sprite.wallSprite, 712, 210, 160, 160);
  ctx.drawImage(sprite.wallSprite, 872, 210, 160, 160);

  sprite.light1.draw(ctx);
  sprite.light2.draw(ctx);


  sprite.gate.draw(ctx);

  sprite.smallBowie.draw(ctx);

  ctx.save();
  ctx.translate(740, 230);
  ctx.rotate(4 * Math.PI / 180);
  sprite.poster.draw(ctx);
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


  if (isTinAttached === true && isAnimated === false && cutTheRope == false) {
    sprite.trapSet.draw(ctx);
  }

  var stopAnimation = sprite.canWater.checkCollision(0, 330, canvas.width, 50);

  var isCuttingRope = sprite.cat.checkCollision(sprite.ropeAnim.x, 0, sprite.ropeAnim.spriteWidth, canvas.height);

  if (stopAnimation === true) isAnimated = false;

  if (isCuttingRope === true) cutTheRope = true;

  if (isTinAttached === true) sprite.canWater.draw(ctx);

  if (isTinAttached === true && isAnimated === true) {
    sprite.ropeAnim.draw(ctx);
    sprite.attachedLid.update(0, -2);
    sprite.canWater.update(0, 2);
  }

  var isLidOn = sprite.attachedLid.checkCollision(0, sprite.trash.y, canvas.width, 10);
  if (isLidOn === true && cutTheRope === true) isCatCaught = true;

  if (cutTheRope === true && isCatCaught === false) {
    sprite.ropeAnimUp.draw(ctx);
    sprite.lid.update(0, 1);
  }

  if (isFishInside === true && dino.x > 750) {
    isTrapReady = true;
  }


  if (isLidAttached === true) sprite.attachedLid.draw(ctx);

  sprite.ring.draw(ctx);

  sprite.sign.draw(ctx);

  sprite.pole.draw(ctx);

  isTrapReady === false ? dodgyCat() : catToTrap();


  if (isReadingPoster == true) {
    ctx.drawImage(sprite.wallSprite, 0, 0, 900, 400);
    sprite.bigBowie.draw(ctx);
    ctx.save();
    ctx.translate(290, 30);
    ctx.rotate(4 * Math.PI / 180);
    sprite.bigPoster.draw(ctx);
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
  sprite.trash.update(-2, 0);
}

function grabCan() {
  if (hasCan === false && hasLid === true) {
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
  }
}

function attachLid() {
  if (hasLid === true && trapSet === true) {
    isLidAttached = true;
    removeObject("couvercle");
  }
}

function attachTin() {
  if (isLidAttached === true && isTinAttached === false && hasWater === false) {
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

var outsideText = [["chat", "Regarder", "Nice cat"], ["bowie", "Lire", "cool"],
["sonette", "Utiliser", "Bonjour!!"], ["porte", "Ouvrir", "Ferme!!!!!"],
["poubelle", "Regarder", "Miam! Il y a une boite de conserve au fond !"]];

var outsideAction = [["Pousser", "poubelle", push], ["Prendre", "poubelle", grabCan],
["Regarder", "bowie", readPoster], ["Prendre", "bigBowie", grabDuct],
["Prendre", "plante grimpante", grabRope], ["Prendre", "bassin", grabFish],
["Prendre", "couvercle", getLid]
];

var outsideObjectAction = [["boulle de scotch", "t??te de lion", stopWater], ["boite de conserve", "bassin", emptyWater],
["corde", "lampe", setTrap], ["couvercle", "corde", attachLid], ["boite de conserve", "corde", attachTin],
["poisson", "poubelle", leaveFish]];

export {
  sprites, outsideText, outsideAction, outsideObjectAction, objects,
  isReadingPoster, readPoster, leavePoster,
};
