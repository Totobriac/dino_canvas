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
catSitSprite.src = "../assets/mansion_level/cat_line_sit.png";

var tickCount = 0;
var ticksPerFrame = 12;
var catFrame = 0;


export function drawOutsideScenery(ctx) {

  tickCount++;

  ctx.drawImage(skySprite, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(hillSprite, 0, -50, 1200, 578);

  ctx.drawImage(lightSprite, 650, 0, 130, 144);
  ctx.drawImage(mansionSprite, 650, 0, 130, 144);

  ctx.fillStyle = ("grey");
  ctx.fillRect(0, 370, canvas.width, 30)

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

  catFrame = checkFrame(tickCount, 16, catFrame);
  ctx.drawImage(catSitSprite, catFrame * 169, 0, 168, 126, -25, 124, 111, 88);
}

function checkFrame(tickCount, frames, frameIndex) {
  if (tickCount > ticksPerFrame) {
    tickCount = 0;
    if (frameIndex < frames - 1) {
      frameIndex += 1;
      return frameIndex;
    } else {
      frameIndex = 0;
      return frameIndex;
    }
  }
}
