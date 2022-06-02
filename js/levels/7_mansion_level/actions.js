import { dino, rmSprite, addSprite } from "./gameMecanic.js";
import * as sprite from "./outside_sprite.js";
import { rope } from "./trap.js";

var isReadingPoster = false;
var hasLid = false;
var isRunningWater = true;
var hasWater = true;
var hasTape = false;

var ropeSet = false;

var isTinAttached = false;
var isLidAttached = false;

var isPushing = false;
var isPulling = false;

var objects = [];

function getLid() {  
  if (!hasLid) {
    objects.push(["couvercle", sprite.lidObject]);
    hasLid = true;
    rmSprite("couvercle");
    sprite.trash.name = "poubelle ";
  }
}

function searchTrash() {
  sprite.trash.name = "boite au fond de la poubelle";
}

function grabCan() {
  objects.push(["boite de conserve", sprite.canSprite]);
  sprite.trash.name = "poubelle ";
}

function grabDuct() {
  objects.push(["boulle de scotch", sprite.ductSprite]);
  sprite.announce.name = "annonce ";
  hasTape = true;
}

function push() {
  if (dino.x > sprite.trash.x) isPushing = true;
}

function pull() {
  if (dino.x < sprite.trash.x) isPulling = true;
}

function grabRope() {
  objects.push(["corde", sprite.ropeSprite]);
  rmSprite("plante grimpante");
}

function stopWater() {
  isRunningWater = false;
  removeObject("boulle de scotch");
  sprite.bowl.name = "bassin ";
}

function emptyWater() {
  removeObject("boite de conserve");
  hasWater = false;
  objects.push(["boite de conserve pleine", sprite.canSpriteWater]);
}

function grabFish() {
  if (!isRunningWater && !hasWater) {
    objects.push(["poisson", sprite.dyingFish]);
  }
}

function attachLid() {
  if (hasLid && ropeSet || hasLid && isTinAttached) {
    isLidAttached = true;
    removeObject("couvercle");
  }
}

function attachTin() {
  ropeSet = false;
  isTinAttached = true;
  removeObject("boite de conserve pleine");
}

function setTrap() {
  ropeSet = true;
  removeObject("corde");
  addSprite(rope);
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

function pass() { };

var outsideAction = [
  ["Regarder", "chat", pass, "Miaou! Miaou!"],
  ["Utiliser", "sonette", pass, "Bonjour!!"],
  ["Ouvrir", "porte", pass, "C'est fermé."],
  ["Regarder", "poubelle", pass, "Peut-être quelque chose a grignoter?"],
  ["Prendre", "couvercle", getLid, "Voyons voir un peu..."],
  ["Ouvrir", "poubelle", getLid, "Voyons voir un peu..."],
  ["Regarder", "poubelle ", searchTrash, "Miam! Une boite de conserve au fond!"],
  ["Prendre", "boite au fond de la poubelle", grabCan],
  ["Regarder", "poster", readPoster],
  ["Prendre", "annonce", grabDuct],
  ["Pousser", "poubelle", push],
  ["Pousser", "poubelle ", push],
  ["Tirer", "poubelle", pull],
  ["Tirer", "poubelle ", pull],
  ["Prendre", "plante grimpante", grabRope],
  ["Prendre", "bassin ", grabFish],

  ["boulle de scotch", "tête de lion", stopWater],
  ["boite de conserve", "bassin ", emptyWater],
  ["corde", "lampe", setTrap],
  ["couvercle", "corde", attachLid],
  ["boite de conserve pleine", "corde", attachTin],
  ["poisson", "poubelle", leaveFish]
]


export {
  outsideAction, isReadingPoster, leavePoster, objects, hasLid, isRunningWater,
  hasWater, hasTape, ropeSet, isTinAttached, isLidAttached, isPushing, isPulling
};
