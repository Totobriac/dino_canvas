import { Sprite } from "./sprite.js";
import { isRunningWater, hasWater, hasLid, hasTape } from "./actions.js";

export var lidObject = new Image();
lidObject.src = "./assets/7_mansion/couvercle.png";

var mansionSprite = new Image();
mansionSprite.src = "./assets/7_mansion/maniac_no_light.png";

var mansionLightSprite = new Image();
mansionLightSprite.src = "./assets/7_mansion/yellow_light.png";

var gateSprite = new Image();
gateSprite.src = "./assets/7_mansion/portail_essai.png";

var skySprite = new Image();
skySprite.src = "./assets/6_race/sky_race_1200.png";

export var wallSprite = new Image();
wallSprite.src = "./assets/7_mansion/wall.png";

var hillSprite = new Image();
hillSprite.src = "./assets/7_mansion/hill_1200_purple.png";

var peeWeeSprite = new Image();
peeWeeSprite.src = "./assets/7_mansion/pee_wee.png";

export var bigPeeWeeSprite = new Image();
bigPeeWeeSprite.src = "./assets/7_mansion/pee_big_pix.png";

var binSprite = new Image();
binSprite.src = "./assets/7_mansion/trash.png";

var lightSprite = new Image();
lightSprite.src = "./assets/7_mansion/light.png";

var ringSprite = new Image();
ringSprite.src = "./assets/7_mansion/ring.png";

var moonSprite = new Image();
moonSprite.src = "./assets/7_mansion/pix_yell_moon.png";

var moonLightSprite = new Image();
moonLightSprite.src = "./assets/7_mansion/pix_yell_moon_light.png";

export var bowie = new Image();
bowie.src = "./assets/7_mansion/bowie_pi.png";

var ivySprite = new Image();
ivySprite.src = "./assets/7_mansion/pix_ivy.png";

var hotelSignSprite = new Image();
hotelSignSprite.src = "./assets/7_mansion/H4E.png";

export var canSprite = new Image();
canSprite.src = "./assets/7_mansion/small_tin.png";

export var canSpriteWater = new Image();
canSpriteWater.src = "./assets/7_mansion/tin_water.png";

export var ductSprite = new Image();
ductSprite.src = "./assets/7_mansion/duct_tape.png";

export var ropeSprite = new Image();
ropeSprite.src = "./assets/7_mansion/ivy_rope.png";

var lionSprite = new Image;
lionSprite.src = "./assets/7_mansion/lion_head.png";

var lionSpriteSc = new Image;
lionSpriteSc.src = "./assets/7_mansion/lion_head_sc.png";

var runningWaterSprite = new Image;
runningWaterSprite.src = "./assets/7_mansion/running_water.png";

var lidSprite = new Image();
lidSprite.src = "./assets/7_mansion/trash_lid.png";

var bubbleSprite = new Image;
bubbleSprite.src = "./assets/7_mansion/bubble.png";

var noBubbleSprite = new Image;
noBubbleSprite.src = "./assets/7_mansion/no_bubble.png";

export var bowlSprite = new Image;
bowlSprite.src = "./assets/7_mansion/bowl.png";

export var fishSprite = new Image();
fishSprite.src = "./assets/7_mansion/jumping_fish.png";

export var dyingFish = new Image();
dyingFish.src = "./assets/7_mansion/fish.png";

export var fishFloor = new Image();
fishFloor.src = "./assets/7_mansion/fish_floor.png";

export var ivy = new Sprite("plante grimpante", ivySprite, -10, 200, 1, 1, 1100, 600, 0.3, false);

export var trash = new Sprite("poubelle", binSprite, 640, 310, 1, 1, 59, 73, 1, false);

export var lid = new Sprite("couvercle", lidSprite, 644, 298, 1, 1, 150, 89, 0.35, true);


export var light1 = new Sprite("lampe", lightSprite, 506, 89, 1, 1, 62, 107, 0.9, false);
export var light2 = new Sprite("lampe2", lightSprite, 314, 89, 1, 1, 62, 107, 0.9, false);


export var gate = new Sprite("porte", gateSprite, 256, 148, 1, 1, 900, 562, 0.40, false);
export var smallPoster = new Sprite("poster", bowie, 730, 220, 1, 1, 570, 796, 0.15, true);
export var bigPoster = new Sprite("poster", bowie, 270, 0, 1, 1, 570, 796, 0.6, true);

export var smallAnnounce = new Sprite("annonce", peeWeeSprite, 0, 0, 1, 1, 188, 250, 0.25, false);
export var bigAnnounce = new Sprite("annonce", bigPeeWeeSprite, 0, 0, 1, 1, 225, 300, 0.9, false);

export var announce = new Sprite("annonce", bigPeeWeeSprite, 280, 45, 1, 1, 225, 300, 0.9, false);

export var ring = new Sprite("sonette", ringSprite, 315, 240, 1, 1, 100, 100, 0.5, false);
export var sign = new Sprite("sign", hotelSignSprite, 519, 210, 1, 1, 200, 200, 0.15, true);

export var lionHead = new Sprite("tête de lion", lionSprite, 90, 280, 1, 1, 162, 199, 0.2, false);
export var lionHeadSc = new Sprite("tête de lion scotchée", lionSpriteSc, 90, 280, 1, 1, 162, 199, 0.2, false);

export var runningWater = new Sprite("eau", runningWaterSprite, 102, 308, 4, 2, 22.5, 130, 0.4, true);

export var bubble = new Sprite("bulles", bubbleSprite, 76, 340, 8, 1, 223, 45, 0.3);
export var noBubble = new Sprite("pas de bulles", noBubbleSprite, 76, 340, 8, 1, 223, 45, 0.3);

export var bowl = new Sprite("bassin", bowlSprite, 53, 340, 1, 1, 111, 21, 1, true);

export var fish = new Sprite("poisson", fishSprite, 65, 310, 58, 58, 100, 75, 0.8, true);


export function drawSetting(ctx) {
  ctx.drawImage(skySprite, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(hillSprite, 0, -50, 1200, 578);
  ctx.drawImage(mansionLightSprite, 650, 0, 130, 144);
  ctx.drawImage(mansionSprite, 650, 0, 130, 144);
  ctx.drawImage(moonLightSprite, 85, 55, 80, 80);
  ctx.drawImage(moonSprite, 100, 70, 50, 50);
  ctx.fillStyle = ("grey");
  ctx.fillRect(0, 360, canvas.width, 40);

  ctx.drawImage(wallSprite, 0, 200, 160, 160);
  ctx.drawImage(wallSprite, 160, 200, 160, 160);
  ctx.drawImage(wallSprite, 552, 200, 160, 160);
  ctx.drawImage(wallSprite, 712, 200, 160, 160);
  ctx.drawImage(wallSprite, 872, 200, 160, 160);

  light1.draw(ctx);
  light2.draw(ctx);

  gate.draw(ctx);

  ring.draw(ctx);
  sign.draw(ctx);

  smallPoster.draw(ctx);

  ctx.save();
  ctx.translate(740, 230);
  ctx.rotate(4 * Math.PI / 180);
  smallAnnounce.draw(ctx);
  ctx.restore();

  ivy.draw(ctx);

  trash.draw(ctx);

  if (!hasLid) lid.draw(ctx);

  drawWater(ctx);
}

function drawWater(ctx) {
  if (hasWater) fish.draw(ctx);
  if (isRunningWater) {
    lionHead.draw(ctx);
    runningWater.draw(ctx);
    bubble.draw(ctx);
  } else {
    lionHeadSc.draw(ctx);
    if (hasWater) noBubble.draw(ctx);
  }
  bowl.draw(ctx);
}

export function drawBigPosters(ctx) {
  ctx.drawImage(wallSprite, 0, 0, 900, 400);
  bigPoster.draw(ctx);
  ctx.save();
  ctx.translate(290, 30);
  ctx.rotate(4 * Math.PI / 180);
  bigAnnounce.draw(ctx);
  ctx.fillStyle = "rgba(225,225,225,0.6)";
  ctx.fillRect(10, -10, 200, 20);
  if (!hasTape) {
    ctx.fillRect(10, 265, 200, 20);
    ctx.fillRect(-5, 25, 20, 250);
    ctx.fillRect(195, 20, 20, 250);
  };
  ctx.restore();
}
