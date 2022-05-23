var skySprite = new Image();
skySprite.src = "./assets/6_race/sky_race_1200.png";

var rocksSprite = new Image();
rocksSprite.src = "./assets/6_race/rocks.png";

var groundSprite_1 = new Image();
groundSprite_1.src = "./assets/6_race/ground_1_600.png";

var groundSprite_2 = new Image();
groundSprite_2.src = "./assets/6_race/ground_2_600.png";

var groundSprite_3 = new Image();
groundSprite_3.src = "./assets/6_race/ground_3_600.png";

var cloudSprite_1 = new Image();
cloudSprite_1.src = "./assets/6_race/clouds_1_sm.png";

var cloudSprite_2 = new Image();
cloudSprite_2.src = "./assets/6_race/clouds_2.png";

var treesSprite = new Image();
treesSprite.src = "./assets/6_race/trees_sprite_sheet.png";

var boarSprite = new Image();
boarSprite.src = "./assets/6_race/run_left.png";

var boarSpriteR = new Image();
boarSpriteR.src = "./assets/6_race/run_right.png";

var mansionSprite = new Image();
mansionSprite.src = "./assets/6_race/maniac_no_light_sm.png";

var blackLightSprite = new Image();
blackLightSprite.src = "./assets/6_race/black_light_sm.png";

var yellowLightSprite = new Image();
yellowLightSprite.src = "./assets/6_race/yellow_light_sm.png";

var signSprite = new Image();
signSprite.src = "./assets/6_race/twin_sign.png";


var ticksPerFrame = 12;
var frameIndex = 0;

var side;

function drawRoad(ctx, points) {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 4200) {
      ctx.fillStyle = "#969696";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 4200) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].roadMark - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].roadMark - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 4200) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length + points[i].roadMark - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length + points[i - 1].roadMark - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 4200) {
      if (i % 6 === 0) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length / 2 - points[i].middleLine / 2 - points[i].curve + points[i].offset, points[i].y - points[i].slope);
        ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length / 2 + points[i].middleLine / 2 - points[i].curve + points[i].offset, points[i].y - points[i].slope);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length / 2 + points[i - 1].middleLine / 2 - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length / 2 - points[i - 1].middleLine / 2 - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

function drawBackground(ctx, playerX, light) {
  ctx.drawImage(skySprite, 0, 150, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(cloudSprite_1, 0, 0, canvas.width, canvas.height, 600, 100, 400, 100);
  ctx.drawImage(rocksSprite, 360, 350, canvas.width, canvas.height, 0, 50, canvas.width, canvas.height);
  ctx.drawImage(cloudSprite_1, 0, 0, canvas.width, canvas.height, 400, 120, 200, 50);

  ctx.drawImage(groundSprite_1, 300 - playerX * 0.05, 0, 300 + playerX * 0.05, 338, 0, 0, 300 + playerX * 0.05, 338);
  ctx.drawImage(groundSprite_1, 0, 0, 600, 338, 300 + playerX * 0.05, 0, 600, 338);
  ctx.drawImage(groundSprite_1, 0, 0, 300, 338, 900 + playerX * 0.05, 0, 300, 338);

  light == false ? ctx.drawImage(blackLightSprite, 380, 190): ctx.drawImage(yellowLightSprite, 380, 190);
  ctx.drawImage(mansionSprite, 380, 190);
}

function drawForest_1(ctx, playerX) {
  ctx.drawImage(groundSprite_2, 300 - playerX * 0.1, 0, 300 + playerX * 0.1, 338, 0, 0, 300 + playerX * 0.1, 338);
  ctx.drawImage(groundSprite_2, 0, 0, 600, 338, 300 + playerX * 0.1, 0, 600, 338);
  ctx.drawImage(groundSprite_2, 0, 0, 300, 338, 900 + playerX * 0.1, 0, 300, 338);
}

function drawForest_2(ctx, playerX) {
  ctx.drawImage(groundSprite_3, 300 - playerX * 0.15, 0, 300 + playerX * 0.15, 338, 0, 0, 300 + playerX * 0.15, 338);
  ctx.drawImage(groundSprite_3, 0, 0, 600, 338, 300 + playerX * 0.15, 0, 600, 338);
  ctx.drawImage(groundSprite_3, 0, 0, 300, 338, 900 + playerX * 0.15, 0, 300, 338);
}

function drawGrass(ctx, points) {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 4200) {
      i % 2 === 0 ? ctx.fillStyle = "#193042" : ctx.fillStyle = "#12273B";
      ctx.beginPath();
      ctx.moveTo(0, points[i].y - points[i].slope);
      ctx.lineTo(canvas.width, points[i].y - points[i].slope);
      ctx.lineTo(canvas.width, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo(0, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function drawTrees(ctx, points) {
  for (let i = 0; i < points.length; i++) {
    if (i % 2 === 0 && points[i].z < 4200 && points[i].z > 100) {
      ctx.drawImage(treesSprite, points[i].treeSpriteL.x, 0, points[i].treeSpriteL.width, 150, canvas.width / 2 - points[i].xR + points[i].offset - points[i].curve, points[i].y - points[i].slope - (treesSprite.height * points[i].scale * 3.5), points[i].treeSpriteL.width * points[i].scale * 4, treesSprite.height * points[i].scale * 4)
      ctx.drawImage(treesSprite, points[i].treeSpriteR.x, 0, points[i].treeSpriteR.width, 150, canvas.width / 2 - points[i].xL + points[i].offset - points[i].curve, points[i].y - points[i].slope - (treesSprite.height * points[i].scale * 3.5), points[i].treeSpriteR.width * points[i].scale * 4, treesSprite.height * points[i].scale * 4)
    }
    if (i % 50 === 0 && points[i].z < 4200 && points[i].z > 100) {
      points[i].side === 1 ? side = points[i].xL : side = points[i].xR;
      ctx.drawImage(signSprite, 0, 0, 124, 106, canvas.width / 2 - side + points[i].offset - points[i].curve, points[i].y - points[i].slope - (159 * points[i].scale * 3.5), 186 * points[i].scale * 4, 159 * points[i].scale * 4)
    }
  }
}

function drawBoars(ctx, points, tickCount) {
  checkFrame(tickCount, 4)
  for (let i = 5; i < points.length; i++) {
    if (i % 7 === 0 && points[i].z < 2200 && points[i].z > 100) {
      points[i].hasBoar = true;
      points[i].runRight === true 
        ? ctx.drawImage(boarSpriteR, frameIndex * 71, 0, 69, 50, canvas.width / 2 + (points[i].boarX * points[i].scale) + points[i].offset - points[i].curve, points[i].y - points[i].slope - (100 * points[i].scale), 71 * points[i].scale * 2, 50 * points[i].scale * 2)
        : ctx.drawImage(boarSprite, frameIndex * 71, 0, 69, 50, canvas.width / 2 + (points[i].boarX * points[i].scale) + points[i].offset - points[i].curve, points[i].y - points[i].slope - (100 * points[i].scale), 71 * points[i].scale * 2, 50 * points[i].scale * 2)
    }
  }
}

function checkFrame(tickCount, frames) {
  if (tickCount > ticksPerFrame) {
    tickCount = 0;
    if (frameIndex < frames - 1) {
      frameIndex += 1;
    } else {
      frameIndex = 0;
    }
  }
}

export { drawRoad, drawBackground, drawForest_1, drawForest_2, drawGrass, drawTrees, drawBoars, checkFrame };
