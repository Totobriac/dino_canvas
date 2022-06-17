import { dino, rmSprite, addSprite } from "./gameMecanic.js";
import { endLevel } from "./startLevel7.js";
import { resetAction } from "./side_bar.js";
import { setDial } from "./gameMecanic.js";
import { playSound } from "./sound.js";

import * as sprite from "./outside_sprite.js";
import { rope, canWater } from "./trap.js";

var openGateSprite = new Image();
openGateSprite.src = "./assets/7_mansion/portail_open.png";

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
    playSound("grabLid");
    objects.push(["couvercle", sprite.lidObject, true]);
    hasLid = true;
    rmSprite("couvercle");
    sprite.trash.name = "poubelle ";
  }
}

function searchTrash() {
  playSound("search");
  sprite.trash.name = "boite au fond de la poubelle";
}

function grabCan() {
  playSound("grabTin")
  objects.push(["boite de conserve", sprite.canSprite, false]);
  sprite.trash.name = "poubelle ";
}

function grabDuct() {
  playSound("tearTape");
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
  playSound("tearIvy");
  objects.push(["corde", sprite.ropeSprite, false]);
  rmSprite("plante grimpante");
}

function stopWater() {
  isRunningWater = false;
  removeObject("boulle de scotch");
  sprite.bowl.name = "bassin ";
}

function emptyWater() {
  playSound("grabWater");
  removeObject("boite de conserve");
  hasWater = false;
  objects.push(["boite de conserve pleine", sprite.canSpriteWater, false]);
  sprite.bowl.name = "bassin  ";
}

function grabFish() {
  if (!isRunningWater && !hasWater) {
    objects.push(["poisson", sprite.dyingFish, true]);
    rmSprite("petit poisson");
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
  rmSprite("boite de conserve pleine");
}

function answer() {
  playSound("ring");
  var choice1 = [" J'ai un colis pour vous ", " C'est moi... "];
  var choice2 = [" C'est moi... Le chat..."];

  dino.isMoving = false;
  canMove = false;
  addSprite(sprite.answer1);
  addSprite(sprite.answer2);
  isCatFree ? setDial(choice1) : setDial(choice2);
  if (!isCatFree) {
    sprite.answer1.name = "answer1 ";
    sprite.ring.name = "sonette  ";
  }
}

function reply() {
  playSound(undefined)
  var clearAns = setTimeout(rmvAns, 3000);
  setDial([]);
}

function rmvAns() {
  canMove = true;
  rmSprite("answer1");
  rmSprite("answer2");
  rmSprite("answer1 ");
}

function grabCat() {
  isCatFree = false;
  objects.push(["chat gourmand mais pas fute-fute", sprite.catHeadSprite, false]);
  sprite.trash.name = "poubelle   ";
  resetAction();
}

function scotch() {
  sprite.announce.name = "scotch";
  sprite.announce.male = true;
}

function renameBowl() {
  sprite.bowl.name = "petit poisson";
}

function endGame() {
  sprite.gate.columns = 4;
  sprite.gate.frames = 4;
  sprite.gate.sprite = openGateSprite;
  endLevel();
}

function pass() { };

var outsideAction = [
  ["Regarder", "chat", pass, " Miaou! Miaou! "],
  ["Regarder", "annonce", scotch, " L' annonce est collée par du scotch. "],
  ["Regarder", "poubelle", pass, " Quelque chose attire les mouches. "],
  ["Regarder", "poubelle ", pass, " Je vois un truc au fond. "],
  ["Regarder", "sonette", pass, " Il y a un bouton pour appeler, c'est une sonette quoi... "],
  ["Regarder", "porte", pass, " Elle est trop haute pour que je grimpe par dessus. "],
  ["Regarder", "poster ", pass, " 'And it was cold and it rained, so I felt like an actor, And I thought of Ma and I wanted to get back there. '"],
  ["Regarder", "poster", readPoster,],
  ["Regarder", "plante grimpante", pass, " Cela ferait une bonne corde. "],
  ["Regarder", "lampe", pass, " Je pourrais y accrocher quelque-chose "],
  ["Regarder", "bassin", pass, " Le petit poisson s'amuse sans savoir que au dessus de lui... "],
  ["Regarder", "bassin  ", renameBowl, " Le petit poisson gît au fond "],

  ["Utiliser", "answer1 ", reply, " Pepeche? Mon petit chaton? C'est bien toi? "],
  ["Utiliser", "answer1", reply, " Jetez-le par dessus la grille "],
  ["Utiliser", "answer2", reply, " Connais pas de moi "],

  ["Utiliser", "sonette", answer, " Cé koi?"],
  ["Utiliser", "sonette ", answer, " koi encore?"],
  ["Ouvrir", "porte", pass, " C'est fermé."],
  ["Prendre", "couvercle", getLid, "Voyons voir un peu..."],
  ["Ouvrir", "poubelle", getLid, "Voyons voir un peu..."],
  ["Fouiller", "poubelle ", searchTrash, " Il y a une boite de conserve au fond! "],
  ["Prendre", "boite au fond de la poubelle", grabCan],

  ["Prendre", "scotch", grabDuct],
  ["Pousser", "poubelle", push],
  ["Pousser", "poubelle ", push],
  ["Pousser", "poubelle  ", push],
  ["Tirer", "poubelle", pull],
  ["Tirer", "poubelle ", pull],
  ["Tirer", "poubelle  ", pull],
  ["Prendre", "plante grimpante", grabRope],
  ["Prendre", "petit poisson", grabFish],
  ["Prendre", "boite de conserve pleine", catchCat],
  ["Prendre", "poubelle  ", grabCat],

  ["boulle de scotch", "tête de lion", stopWater,],
  ["boite de conserve", "bassin ", emptyWater, " Je n'ai pas reussis à attraper le poisson "],
  ["corde", "lampe", setTrap],
  ["couvercle", "corde", attachLid],
  ["boite de conserve pleine", "corde", attachTin],
  ["poisson", "poubelle ", leaveFish],
  ["chat gourmand mais pas fute-fute", "sonette  ", endGame, " Entre mon petit minet "],
]


export {
  outsideAction, isReadingPoster, leavePoster, objects, hasLid, isRunningWater,
  hasWater, hasTape, ropeSet, isTinAttached, isLidAttached, isPushing, isPulling,
  isFishInside, triggerTrap, canMove,
};
