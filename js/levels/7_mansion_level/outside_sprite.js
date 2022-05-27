import { Sprite } from "../character/sprite.js";

export var mansionSprite = new Image();
mansionSprite.src = "./assets/7_mansion/maniac_no_light.png";

export var mansionLightSprite = new Image();
mansionLightSprite.src = "./assets/7_mansion/yellow_light.png";

export var gateSprite = new Image();
gateSprite.src = "./assets/7_mansion/portail_essai.png";

export var skySprite = new Image();
skySprite.src = "./assets/6_race/sky_race_1200.png";

export var wallSprite = new Image();
wallSprite.src = "./assets/7_mansion/wall.png";

export var hillSprite = new Image();
hillSprite.src = "./assets/7_mansion/hill_1200_purple.png";

export var peeWeeSprite = new Image();
peeWeeSprite.src = "./assets/7_mansion/pee_wee.png";

export var bigPeeWeeSprite = new Image();
bigPeeWeeSprite.src = "./assets/7_mansion/pee_big_pix.png";

export var binSprite = new Image();
binSprite.src = "./assets/7_mansion/trash.png";

export var lidSprite = new Image();
lidSprite.src = "./assets/7_mansion/trash_lid.png";

export var lightSprite = new Image();
lightSprite.src = "./assets/7_mansion/light.png";

export var ringSprite = new Image();
ringSprite.src = "./assets/7_mansion/ring.png";

export var moonSprite = new Image();
moonSprite.src = "./assets/7_mansion/pix_yell_moon.png";

export var moonLightSprite = new Image();
moonLightSprite.src = "./assets/7_mansion/pix_yell_moon_light.png";

export var bowie = new Image();
bowie.src = "./assets/7_mansion/bowie_pi.png";

export var ivySprite = new Image();
ivySprite.src = "./assets/7_mansion/pix_ivy.png";

export var catWalkRight = new Image();
catWalkRight.src = "./assets/7_mansion/cat_walk_right.png";

export var catWalkLeft = new Image();
catWalkLeft.src = "./assets/7_mansion/cat_walk_left.png";

export var catSitLeft = new Image();
catSitLeft.src = "./assets/7_mansion/cat_sit_left.png";

export var catSitRight = new Image();
catSitRight.src = "./assets/7_mansion/cat_sit_right.png";

export var hotelSignSprite = new Image();
hotelSignSprite.src = "./assets/7_mansion/H4E.png";

export var canSprite = new Image();
canSprite.src = "./assets/7_mansion/small_tin.png";

export var canSpriteWater = new Image();
canSpriteWater.src = "./assets/7_mansion/tin_water.png";

export var canFull = new Image();
canFull.src = "./assets/7_mansion/full_tin.png";

export var ductSprite = new Image();
ductSprite.src = "./assets/7_mansion/duct_tape.png";

export var ropeSprite = new Image();
ropeSprite.src = "./assets/7_mansion/ivy_rope.png";

export var lionSprite = new Image;
lionSprite.src = "./assets/7_mansion/lion_head.png";

export var lionSpriteSc = new Image;
lionSpriteSc.src = "./assets/7_mansion/lion_head_sc.png";

export var runningWaterSprite = new Image;
runningWaterSprite.src = "./assets/7_mansion/running_water.png";

export var bubbleSprite = new Image;
bubbleSprite.src = "./assets/7_mansion/bubble.png";

export var noBubbleSprite = new Image;
noBubbleSprite.src = "./assets/7_mansion/no_bubble.png";

export var bowlSprite = new Image;
bowlSprite.src = "./assets/7_mansion/bowl.png";

export var fishSprite = new Image();
fishSprite.src = "./assets/7_mansion/jumping_fish.png";

export var dyingFish = new Image();
dyingFish.src = "./assets/7_mansion/fish.png";

export var ropeCamera = new Image();
ropeCamera.src = "./assets/7_mansion/rope_trap.png";

export var ropeTrapSet = new Image();
ropeTrapSet.src = "./assets/7_mansion/rope_trap_set.png";

export var lidObject = new Image();
lidObject.src = "./assets/7_mansion/couvercle.png";

export var ropeAnimation = new Image();
ropeAnimation.src = "./assets/7_mansion/rope_anim.png";

export var ropeAnimationUp = new Image();
ropeAnimationUp.src = "./assets/7_mansion/rope_up.png";

export var fishFloor = new Image();
fishFloor.src = "./assets/7_mansion/fish_floor.png";

export var flyingCat = new Image();
flyingCat.src = "./assets/7_mansion/flying_cat.png";

export var runningCat = new Image();
runningCat.src = "./assets/7_mansion/running_cat.png";

export var divingCat = new Image();
divingCat.src = "./assets/7_mansion/diving_cat.png";

export var cat = new Sprite("chat", catSitLeft, -25, 145, 16, 4, 111.5, 83.5, 0.8);
export var ivy = new Sprite("plante grimpante", ivySprite, -10, 210, 1, 1, 1100, 600, 0.3);
export var trash = new Sprite("poubelle", binSprite, 640, 310, 1, 1, 1676, 2094, 0.035);
export var lid = new Sprite("couvercle", lidSprite, 634, 295, 1, 1, 512, 512, 0.125);

export var light1 = new Sprite("lampe", lightSprite, 452, 78, 1, 1, 200, 200, 0.8);
export var light2 = new Sprite("lampe2", lightSprite, 260, 78, 1, 1, 200, 200, 0.8);

export var gate = new Sprite("porte", gateSprite, 256, 158, 1, 1, 900, 562, 0.40);

export var smallBowie = new Sprite("bowie", bowie, 730, 220, 1, 1, 570, 796, 0.15);
export var bigBowie = new Sprite("bigBowie", bowie, 270, 0, 1, 1, 570, 796, 0.6);

export var poster = new Sprite("poster", peeWeeSprite, 0, 0, 1, 1, 188, 250, 0.25);
export var bigPoster = new Sprite("bigPoster", bigPeeWeeSprite, 0, 0, 1, 1, 225, 300, 0.9);

export var ring = new Sprite("sonette", ringSprite, 315, 250, 1, 1, 100, 100, 0.5);
export var sign = new Sprite("sign", hotelSignSprite, 519, 220, 1, 1, 200, 200, 0.15);


export var lionHead = new Sprite("tête de lion", lionSprite, 90, 290, 1, 1, 162, 199, 0.2);
export var lionHeadSc = new Sprite("tête de lion scotchée", lionSpriteSc, 90, 290, 1, 1, 162, 199, 0.2);


export var runningWater = new Sprite("eau", runningWaterSprite, 102, 318, 4, 2, 22.5, 130, 0.4);

export var bubble = new Sprite("bulles", bubbleSprite, 76, 350, 8, 1, 223, 45, 0.3);
export var noBubble = new Sprite("pas de bulles", noBubbleSprite, 76, 350, 8, 1, 223, 45, 0.3);


export var bowl = new Sprite("bassin", bowlSprite, 53, 350, 1, 1, 111, 21, 1);

export var fish = new Sprite("poisson", fishSprite, 65, 320, 58, 58, 100, 75, 0.8);

export var trap = new Sprite("corde", ropeCamera, 512, 162, 1, 1, 70, 530, 0.5);

export var trapSet = new Sprite("corde", ropeTrapSet, 512, 162, 1, 1, 70, 530, 0.5);

export var ropeAnim = new Sprite("corde", ropeAnimation, 512,162, 8, 8, 70, 530, 0.5 )

export var ropeAnimUp = new Sprite("corde", ropeAnimationUp, 512,162, 8, 8, 70, 530, 0.5 )

export var attachedLid = new Sprite("couvercle", lidSprite, 512, 348, 1, 1, 512, 512, 0.125);

export var canWater = new Sprite("boite de conserve", canFull, 500, 250, 1, 1, 140, 120, 0.3 );
