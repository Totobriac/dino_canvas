import { dino, rmSprite, addSprite, setDial } from "./gameMecanic.js";
import * as sprite from "./outside_sprite.js";
import { rope, canWater } from "./trap.js";


var isReadingPoster = false;
var hasLid = false;
var isRunningWater = true;
var hasWater = true;
var hasTape = false;
var ropeSet = false;
var isTinAttached = false;
var isLidAttached = false;
var isFishInside = false;
var isPushing = false;
var isPulling = false;
var triggerTrap = false;
var objects = [];

var canMove = true;
var isCatFree = true;

function getLid() {
  if (!hasLid) {
    objects.push(["couvercle", sprite.lidObject, true]);
    hasLid = true;
    rmSprite("couvercle");
    sprite.trash.name = "poubelle ";
  }
}

function searchTrash() {
  sprite.trash.name = "boite au fond de la poubelle";
}

function grabCan() {
  objects.push(["boite de conserve", sprite.canSprite, false]);
  sprite.trash.name = "poubelle ";
}

function grabDuct() {
  objects.push(["boulle de scotch", sprite.ductSprite, false]);
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
  objects.push(["corde", sprite.ropeSprite, false]);
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
  objects.push(["boite de conserve pleine", sprite.canSpriteWater, false]);
}

function grabFish() {
  if (!isRunningWater && !hasWater) {
    objects.push(["poisson", sprite.dyingFish, true]);
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
  addSprite(canWater);
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

function catchCat() {
  triggerTrap = true;
  sprite.ring.name = "sonette ";
  sprite.trash.name = "poubelle  ";
}

function answer() {
  dino.isMoving = false;
  canMove = false;
  var choice1 = [" J'ai un colis pour vous ", " C'est moi... "];
  var choice2 = [" J'ai un colis pour vous ", " C'est moi... "];
  addSprite(sprite.answer1);
  addSprite(sprite.answer2);
  isCatFree ? setDial(choice1) : setDial(choice2);
}

function reply() {
  var clearAns = setTimeout(rmvAns, 3000);  
  setDial([]);
}

function rmvAns() {
  canMove = true;
  rmSprite("answer1");
  rmSprite("answer2");
}

function phrase1() {
  var ans;
  isCatFree ? ans = "Jete leu par dessu la pote" : ans = "coc";
  return ans;
}

function phrase2() {
  var ans;
  isCatFree ? ans = "Conné pa de moi" : ans = "coc";
  return ans;
}

function grabCat() {
  isCatFree = false;
  objects.push(["chat gourmand mais pas fute-fute", sprite.catHeadSprite, false]);
}

function pass() { };

var outsideAction = [
  [undefined, "answer1", reply, phrase1()],
  [undefined, "answer2", reply, phrase2()],
  ["Regarder", "chat", pass, " Miaou! Miaou!"],
  ["Utiliser", "sonette", answer, " Cé koi?"],
  ["Utiliser", "sonette ", answer, " koi encore?"],
  ["Ouvrir", "porte", pass, " C'est fermé."],
  ["Regarder", "poubelle", pass, " Peut-être quelque chose a grignoter?"],
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
  ["Prendre", "boite de conserve pleine", catchCat],
  ["Prendre", "poubelle  ", grabCat],

  ["boulle de scotch", "tête de lion", stopWater],
  ["boite de conserve", "bassin ", emptyWater],
  ["corde", "lampe", setTrap],
  ["couvercle", "corde", attachLid],
  ["boite de conserve pleine", "corde", attachTin],
  ["poisson", "poubelle ", leaveFish]
]


export {
  outsideAction, isReadingPoster, leavePoster, objects, hasLid, isRunningWater,
  hasWater, hasTape, ropeSet, isTinAttached, isLidAttached, isPushing, isPulling,
  isFishInside, triggerTrap, canMove, isCatFree
};
