import { Sprite } from "../character/sprite.js";

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

var catSitSprite = new Image();
catSitSprite.src = "../assets/mansion_level/cat_sit_sm.png";

var binSprite = new Image();
binSprite.src = "../assets/mansion_level/trash_pix_sm.png";

var cameraSprite = new Image();
cameraSprite.src = "../assets/mansion_level/grey_cam.png";

var ringSprite = new Image();
ringSprite.src = "../assets/mansion_level/ring.png";

var moonSprite = new Image();
moonSprite.src = "../assets/mansion_level/pix_yell_moon.png";

var moonLightSprite = new Image();
moonLightSprite.src = "../assets/mansion_level/pix_yell_moon_light.png";



var sittingCat = new Sprite(catSitSprite, 16, 4, 111.5, 83.5, 0.8);
var trash = new Sprite(binSprite, 1, 1, 1676, 2094, 0.03);
var camera = new Sprite(cameraSprite, 1, 1, 800, 800, 0.12)


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
  ctx.drawImage(gateSprite, 256, 140, 360, 240);
  ctx.save();
  ctx.translate(750, 250);
  ctx.rotate(4 * Math.PI / 180);
  ctx.drawImage(peeWeeSprite, 0, 0, 47, 62);
  ctx.restore();
  sittingCat.draw(ctx, -25, 145);
  trash.draw(ctx, 640, 315);
  camera.draw(ctx, 468, 95);
  ctx.drawImage(ringSprite, 315, 250, 50, 50);
}
