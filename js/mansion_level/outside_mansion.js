import { Sprite } from "../character/sprite.js";
import { dino } from "./gameMecanic.js";

var mansionSprite = new Image();
mansionSprite.src = "../assets/mansion_level/maniac_no_light.png";

var lightSprite = new Image();
lightSprite.src = "../assets/mansion_level/yellow_light.png";

var gateSprite = new Image();
gateSprite.src = "../assets/mansion_level/portail_essai.png";

var skySprite = new Image();
skySprite.src = "../assets/road_level/sky_race_1200.png";

var wallSprite = new Image();
wallSprite.src = "../assets/mansion_level/wall.png";

var hillSprite = new Image();
hillSprite.src = "../assets/mansion_level/hill_1200_purple.png";

var peeWeeSprite = new Image();
peeWeeSprite.src = "../assets/mansion_level/pee_wee.png";

var bigPeeWeeSprite = new Image();
bigPeeWeeSprite.src = "../assets/mansion_level/pee_big_pix.png";

var binSprite = new Image();
binSprite.src = "../assets/mansion_level/trash_pix_sm.png";

var cameraSprite = new Image();
cameraSprite.src = "../assets/mansion_level/grey_cam_pix_2.png";

var ringSprite = new Image();
ringSprite.src = "../assets/mansion_level/ring.png";

var moonSprite = new Image();
moonSprite.src = "../assets/mansion_level/pix_yell_moon.png";

var moonLightSprite = new Image();
moonLightSprite.src = "../assets/mansion_level/pix_yell_moon_light.png";

var bowie = new Image();
bowie.src = "../assets/mansion_level/bowie_pi.png";

var ivySprite = new Image();
ivySprite.src = "../assets/mansion_level/pix_ivy.png";

var catWalkRight = new Image();
catWalkRight.src = "../assets/mansion_level/cat_walk_right.png";

var catWalkLeft = new Image();
catWalkLeft.src = "../assets/mansion_level/cat_walk_left.png";

var catSitLeft = new Image();
catSitLeft.src = "../assets/mansion_level/cat_sit_left.png";

var catSitRight = new Image();
catSitRight.src = "../assets/mansion_level/cat_sit_right.png";

var hotelSignSprite = new Image();
hotelSignSprite.src = "../assets/mansion_level/H4E.png";

var canSprite = new Image();
canSprite.src = "../assets/mansion_level/small_tin.png";

var ductSprite = new Image();
ductSprite.src = "../assets/mansion_level/duct_tape.png";

var ropeSprite = new Image();
ropeSprite.src = "../assets/mansion_level/ivy_rope.png";

var wetRopeSprite = new Image();
wetRopeSprite.src = "../assets/mansion_level/wet_rope.png";

var smPuddleSprite = new Image();
smPuddleSprite.src = "../assets/mansion_level/small_puddle.png";

var poleSprite = new Image();
poleSprite.src = "../assets/mansion_level/pole.png";

var unrolledSprite = new Image();
unrolledSprite.src = "../assets/mansion_level/unrolled_rope.png";

var lionSprite = new Image;
lionSprite.src = "../assets/mansion_level/lion_head.png";

var runningWaterSprite = new Image;
runningWaterSprite.src = "../assets/mansion_level/running_water.png";

var bubbleSprite = new Image;
bubbleSprite.src = "../assets/mansion_level/bubble.png";

var bowlSprite = new Image;
bowlSprite.src = "../assets/mansion_level/bowl.png";


var cat = new Sprite("cat", catSitLeft, -25, 145, 16, 4, 111.5, 83.5, 0.8);
var ivy = new Sprite("plante grimpante", ivySprite, -10, 210, 1, 1, 1100, 600, 0.3);
var trash = new Sprite("trash", binSprite, 640, 320, 1, 1, 1676, 2094, 0.03);
var camera = new Sprite("cctv", cameraSprite, 468, 113, 1, 1, 800, 800, 0.12);
var gate = new Sprite("gate", gateSprite, 256, 158, 1, 1, 900, 562, 0.40);

var smallBowie = new Sprite("bowie", bowie, 730, 220, 1, 1, 570, 796, 0.15);
var bigBowie = new Sprite("bigBowie", bowie, 270, 0, 1, 1, 570, 796, 0.6);

var poster = new Sprite("poster", peeWeeSprite, 0, 0, 1, 1, 188, 250, 0.25);
var bigPoster = new Sprite("bigPoster", bigPeeWeeSprite, 0, 0, 1, 1, 225, 300, 0.9);

var ring = new Sprite("ring", ringSprite, 315, 250, 1, 1, 100, 100, 0.5);
var sign = new Sprite("sign", hotelSignSprite, 519, 220, 1, 1, 200, 200, 0.15);

var pole = new Sprite("poteau", poleSprite, 0, 0, 1, 1, 1200, 400, 1);

var unrolledRope = new Sprite("cable", unrolledSprite, 270, 80, 1, 1, 35, 375, 0.4);

var lionHead = new Sprite("tête de lion", lionSprite, 90, 290, 1, 1, 162, 199, 0.2);

var runningWater = new Sprite("eau", runningWaterSprite, 102, 318, 4, 2, 22.5, 130, 0.4);

var bubble = new Sprite("bulles", bubbleSprite, 76, 350, 8, 1, 223, 45, 0.3);

var bowl = new Sprite("bassin", bowlSprite, 53, 350, 1,1,111,21, 1 )

var smPuddle = new Sprite("flaquette", smPuddleSprite, 800, 380, 1, 1, 238, 86, 0.7);
var mdPuddle = new Sprite("flaque", smPuddleSprite, 112, 370, 1, 1, 238, 86, 0.8);

var puddles = [{ "puddle": smPuddle, "collide": false }, { "puddle": mdPuddle, "collide": false }];

var isReadingPoster = false;

var hasReflection = false;

var currentPuddle = {
  "x": 0,
  "width": 0,
  "xw": 0,
  "offset": 0,
}

var offset;

var sprites;

var isDinoLeft = false;

var objects = [];

var hasCan = false;

var hasTape = false;

var hasRope = false;

var hasWetRope = false;

export function drawOutsideScenery(ctx) {

  isReadingPoster === false ? sprites = [cat, trash, camera, ring, gate, smallBowie, ivy, mdPuddle] : sprites = [bigBowie];

  ctx.drawImage(skySprite, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(hillSprite, 0, -50, 1200, 578);
  ctx.drawImage(lightSprite, 650, 0, 130, 144);
  ctx.drawImage(mansionSprite, 650, 0, 130, 144);
  ctx.drawImage(moonLightSprite, 85, 55, 80, 80);
  ctx.drawImage(moonSprite, 100, 70, 50, 50);
  ctx.fillStyle = ("grey");
  ctx.fillRect(0, 370, canvas.width, 30);

  //smPuddle.draw(ctx);
  //mdPuddle.draw(ctx);

  ctx.drawImage(wallSprite, 0, 210, 160, 160);
  ctx.drawImage(wallSprite, 160, 210, 160, 160);
  ctx.drawImage(wallSprite, 552, 210, 160, 160);
  ctx.drawImage(wallSprite, 712, 210, 160, 160);
  ctx.drawImage(wallSprite, 872, 210, 160, 160);

  gate.draw(ctx);

  smallBowie.draw(ctx);

  ctx.save();
  ctx.translate(740, 230);
  ctx.rotate(4 * Math.PI / 180);
  poster.draw(ctx);
  ctx.restore();

  if (isDinoLeft == true) {
    if (cat.x == -25) cat.sprite = catSitLeft;
    if (cat.x > -25 && cat.x < 230) cat.sprite = catWalkRight;
    if (cat.x == 230) cat.sprite = catSitRight;
  }
  else {
    if (cat.x == -25) cat.sprite = catSitLeft;
    if (cat.x > -25 && cat.x < 230) cat.sprite = catWalkLeft;
  }
  cat.draw(ctx);

  ivy.draw(ctx);

  lionHead.draw(ctx);

  runningWater.draw(ctx);

  bubble.draw(ctx);

  bowl.draw(ctx);

  trash.draw(ctx);

  camera.draw(ctx);

  ring.draw(ctx);

  sign.draw(ctx);

  pole.draw(ctx);

  dodgyCat();

  //checkReflection();

  if (isReadingPoster == true) {
    ctx.drawImage(wallSprite, 0, 0, 900, 400);
    bigBowie.draw(ctx);
    ctx.save();
    ctx.translate(290, 30);
    ctx.rotate(4 * Math.PI / 180);
    bigPoster.draw(ctx);
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
    if (cat.x < 230) {
      cat.update(3, 0);
    }
  }
  else {
    isDinoLeft = false;
  }
  if (isDinoLeft == false) {
    if (cat.x > -25) {
      cat.update(-3, 0);
    }
  }
}

function push() {
  trash.update(-2, 0);
}

function grabCan() {
  if (hasCan == false) {
    objects.push(["boite de conserve", canSprite]);
    hasCan = true;
  }
}

function grabDuct() {
  if (hasTape == false) {
    objects.push(["boulle de scotch", ductSprite]);
    hasTape = true;
  }
}

function grabRope() {
  if (hasRope == false) {
    objects.push(["corde", ropeSprite]);
    hasRope = true;
    removeObject("boite de conserve");
  }
}

function wetRope() {
  if (hasWetRope == false) {
    objects.push(["corde mouillée", wetRopeSprite]);
    hasWetRope = true;
    removeObject("corde");
  }
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

function checkReflection() {
  for (let i = 0; i < puddles.length; i++) {
    puddles[i].collide = puddles[i].puddle.checkCollision(dino.x, dino.y + (dino.spriteHeight / 2 * dino.scale) + 4,
      dino.spriteWidth * dino.scale, dino.spriteWidth / 2 * dino.scale);
    if (puddles[i].collide === true) {
      currentPuddle.x = puddles[i].puddle.x;
      currentPuddle.width = puddles[i].puddle.spriteWidth * puddles[i].puddle.scale;
      currentPuddle.xw = currentPuddle.x + currentPuddle.width;
    }
    if (puddles[i].collide === true && dino.x > puddles[i].puddle.x) {
      offset = puddles[i].puddle.x + (puddles[i].puddle.spriteWidth * puddles[i].puddle.scale) - dino.x;
    }
    if (puddles[i].collide === true && dino.x < puddles[i].puddle.x) {
      offset = puddles[i].puddle.x - dino.x;
    }

  }
  puddles[0].collide == true || puddles[1].collide == true
    ? hasReflection = true
    : hasReflection = false;
}

var outsideText = [["cat", "Regarder", "Nice cat"], ["bowie", "Lire", "cool"],
["ring", "Utiliser", "Bonjour!!"], ["gate", "Ouvrir", "Ferme!!!!!"],
["trash", "Regarder", "Miam! Il y a une boite de conserve au fond !"]];

var outsideAction = [["Pousser", "trash", push], ["Prendre", "trash", grabCan],
["Regarder", "bowie", readPoster], ["Prendre", "bigBowie", grabDuct],
];

var outsideObjectAction = [["boite de conserve", "plante grimpante", grabRope],
["corde", "flaque", wetRope]];

export {
  trash, sprites, outsideText, outsideAction, outsideObjectAction, objects,
  isReadingPoster, readPoster, leavePoster, hasReflection, offset, currentPuddle
};
