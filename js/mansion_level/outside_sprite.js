import { Sprite } from "../character/sprite.js";

export var mansionSprite = new Image();
mansionSprite.src = "../assets/mansion_level/maniac_no_light.png";

export var lightSprite = new Image();
lightSprite.src = "../assets/mansion_level/yellow_light.png";

export var gateSprite = new Image();
gateSprite.src = "../assets/mansion_level/portail_essai.png";

export var skySprite = new Image();
skySprite.src = "../assets/road_level/sky_race_1200.png";

export var wallSprite = new Image();
wallSprite.src = "../assets/mansion_level/wall.png";

export var hillSprite = new Image();
hillSprite.src = "../assets/mansion_level/hill_1200_purple.png";

export var peeWeeSprite = new Image();
peeWeeSprite.src = "../assets/mansion_level/pee_wee.png";

export var bigPeeWeeSprite = new Image();
bigPeeWeeSprite.src = "../assets/mansion_level/pee_big_pix.png";

export var binSprite = new Image();
binSprite.src = "../assets/mansion_level/trash.png";

export var lidSprite = new Image();
lidSprite.src = "../assets/mansion_level/trash_lid.png";

export var cameraSprite = new Image();
cameraSprite.src = "../assets/mansion_level/grey_cam_pix_2.png";

export var ringSprite = new Image();
ringSprite.src = "../assets/mansion_level/ring.png";

export var moonSprite = new Image();
moonSprite.src = "../assets/mansion_level/pix_yell_moon.png";

export var moonLightSprite = new Image();
moonLightSprite.src = "../assets/mansion_level/pix_yell_moon_light.png";

export var bowie = new Image();
bowie.src = "../assets/mansion_level/bowie_pi.png";

export var ivySprite = new Image();
ivySprite.src = "../assets/mansion_level/pix_ivy.png";

export var catWalkRight = new Image();
catWalkRight.src = "../assets/mansion_level/cat_walk_right.png";

export var catWalkLeft = new Image();
catWalkLeft.src = "../assets/mansion_level/cat_walk_left.png";

export var catSitLeft = new Image();
catSitLeft.src = "../assets/mansion_level/cat_sit_left.png";

export var catSitRight = new Image();
catSitRight.src = "../assets/mansion_level/cat_sit_right.png";

export var hotelSignSprite = new Image();
hotelSignSprite.src = "../assets/mansion_level/H4E.png";

export var canSprite = new Image();
canSprite.src = "../assets/mansion_level/small_tin.png";

export var canSpriteWater = new Image();
canSpriteWater.src = "../assets/mansion_level/tin_water.png";

export var ductSprite = new Image();
ductSprite.src = "../assets/mansion_level/duct_tape.png";

export var ropeSprite = new Image();
ropeSprite.src = "../assets/mansion_level/ivy_rope.png";

export var poleSprite = new Image();
poleSprite.src = "../assets/mansion_level/pole.png";

export var unrolledSprite = new Image();
unrolledSprite.src = "../assets/mansion_level/unrolled_rope.png";

export var lionSprite = new Image;
lionSprite.src = "../assets/mansion_level/lion_head.png";

export var lionSpriteSc = new Image;
lionSpriteSc.src = "../assets/mansion_level/lion_head_sc.png";

export var runningWaterSprite = new Image;
runningWaterSprite.src = "../assets/mansion_level/running_water.png";

export var bubbleSprite = new Image;
bubbleSprite.src = "../assets/mansion_level/bubble.png";

export var noBubbleSprite = new Image;
noBubbleSprite.src = "../assets/mansion_level/no_bubble.png";

export var bowlSprite = new Image;
bowlSprite.src = "../assets/mansion_level/bowl.png";

export var fishSprite = new Image();
fishSprite.src = "../assets/mansion_level/jumping_fish.png";

export var dyingFish = new Image();
dyingFish.src = "../assets/mansion_level/fish.png";

export var ropeCamera = new Image();
ropeCamera.src = "../assets/mansion_level/rope_camera.png";

export var lidObject = new Image();
lidObject.src = "../assets/mansion_level/couvercle.png";

export var cat = new Sprite("chat", catSitLeft, -25, 145, 16, 4, 111.5, 83.5, 0.8);
export var ivy = new Sprite("plante grimpante", ivySprite, -10, 210, 1, 1, 1100, 600, 0.3);
export var trash = new Sprite("poubelle", binSprite, 640, 320, 1, 1, 1676, 2094, 0.03);
export var lid = new Sprite("couvercle", lidSprite, 634, 306, 1, 1, 512, 512, 0.11);
export var camera = new Sprite("camera", cameraSprite, 468, 113, 1, 1, 800, 800, 0.12);
export var gate = new Sprite("gate", gateSprite, 256, 158, 1, 1, 900, 562, 0.40);

export var smallBowie = new Sprite("bowie", bowie, 730, 220, 1, 1, 570, 796, 0.15);
export var bigBowie = new Sprite("bigBowie", bowie, 270, 0, 1, 1, 570, 796, 0.6);

export var poster = new Sprite("poster", peeWeeSprite, 0, 0, 1, 1, 188, 250, 0.25);
export var bigPoster = new Sprite("bigPoster", bigPeeWeeSprite, 0, 0, 1, 1, 225, 300, 0.9);

export var ring = new Sprite("sonette", ringSprite, 315, 250, 1, 1, 100, 100, 0.5);
export var sign = new Sprite("sign", hotelSignSprite, 519, 220, 1, 1, 200, 200, 0.15);

export var pole = new Sprite("poteau", poleSprite, 0, 0, 1, 1, 1200, 400, 1);

export var unrolledRope = new Sprite("cable", unrolledSprite, 270, 80, 1, 1, 35, 375, 0.4);

export var lionHead = new Sprite("tête de lion", lionSprite, 90, 290, 1, 1, 162, 199, 0.2);
export var lionHeadSc = new Sprite("tête de lion scotchée", lionSpriteSc, 90, 290, 1, 1, 162, 199, 0.2);


export var runningWater = new Sprite("eau", runningWaterSprite, 102, 318, 4, 2, 22.5, 130, 0.4);

export var bubble = new Sprite("bulles", bubbleSprite, 76, 350, 8, 1, 223, 45, 0.3);
export var noBubble = new Sprite("pas de bulles", noBubbleSprite, 76, 350, 8, 1, 223, 45, 0.3);


export var bowl = new Sprite("bassin", bowlSprite, 53, 350, 1, 1, 111, 21, 1);

export var fish = new Sprite("poisson", fishSprite, 65, 320, 58, 58, 100, 75, 0.8);

export var trap = new Sprite("piége", ropeCamera, 512, 168, 1, 1, 70, 375, 0.5);
