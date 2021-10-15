import { Sprite } from "../character/sprite.js";
import { isDinoLeft, isCatRight } from "./gameMecanic.js";

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



var cat = new Sprite("cat", catSitLeft, -25, 145, 16, 4, 111.5, 83.5, 0.8);
var trash = new Sprite("trash", binSprite, 640, 320, 1, 1, 1676, 2094, 0.03);
var camera = new Sprite("cctv", cameraSprite, 468, 113, 1, 1, 800, 800, 0.12);
var gate = new Sprite("gate", gateSprite, 256, 158, 1, 1, 900, 562, 0.40);
var bowie = new Sprite("bowie", bowie, 730, 220, 1, 1, 570, 796, 0.15);
var poster = new Sprite("poster", peeWeeSprite, 0, 0, 1, 1, 188, 250, 0.25);
var ring = new Sprite("ring", ringSprite, 315, 250, 1, 1, 100, 100, 0.5);
var ivy = new Sprite("ivy", ivySprite, -10, 210, 1, 1, 1100, 600, 0.3);

var sprites = [cat, trash, camera, ring, gate, bowie];

export function drawOutsideScenery(ctx) {

  ctx.drawImage(skySprite, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(hillSprite, 0, -50, 1200, 578);
  ctx.drawImage(lightSprite, 650, 0, 130, 144);
  ctx.drawImage(mansionSprite, 650, 0, 130, 144);
  ctx.drawImage(moonLightSprite, 85, 55, 80, 80);
  ctx.drawImage(moonSprite, 100, 70, 50, 50);
  ctx.fillStyle = ("grey");
  ctx.fillRect(0, 370, canvas.width, 30);

  ctx.drawImage(wallSprite, 0, 210, 160, 160);
  ctx.drawImage(wallSprite, 160, 210, 160, 160);
  ctx.drawImage(wallSprite, 552, 210, 160, 160);
  ctx.drawImage(wallSprite, 712, 210, 160, 160);
  ctx.drawImage(wallSprite, 872, 210, 160, 160);

  gate.draw(ctx);

  bowie.draw(ctx);

  ctx.save();
  ctx.translate(740, 230);
  ctx.rotate(4 * Math.PI / 180);
  poster.draw(ctx);
  ctx.restore();

  if (isDinoLeft == true) {
    if (cat.x == -25) cat.sprite = catSitLeft;
    if (cat.x != -25 && cat.x != 230) catWalkRight;
    if (cat.x == 230) cat.sprite = catSitRight;
  }

  // else if (isDinoLeft == false) {
  //   cat.x != 230 ? cat.sprite = catWalkLeft : cat.sprite = catSitRight;
  // }

  cat.draw(ctx);

  trash.draw(ctx);

  camera.draw(ctx);

  ring.draw(ctx);

  ivy.draw(ctx);
}

export { trash, cat, sprites };
