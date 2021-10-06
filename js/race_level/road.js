var carSprite = new Image();
carSprite.src = "../assets/road_level/red_coupe.png";

var skySprite = new Image();
skySprite.src = "../assets/road_level/sky_race_1200.png";

var rocksSprite = new Image();
rocksSprite.src = "../assets/road_level/rocks.png";

var groundSprite_1 = new Image();
groundSprite_1.src = "../assets/road_level/ground_1_600.png";

var groundSprite_2 = new Image();
groundSprite_2.src = "../assets/road_level/ground_2_600.png";

var groundSprite_3 = new Image();
groundSprite_3.src = "../assets/road_level/ground_3_600.png";

var cloudSprite_1 = new Image();
cloudSprite_1.src = "../assets/road_level/clouds_1_sm.png";

var cloudSprite_2 = new Image();
cloudSprite_2.src = "../assets/road_level/clouds_2.png";

var treesSprite = new Image();
treesSprite.src = "../assets/road_level/trees_sprite_sheet.png";

var boarSprite = new Image();
boarSprite.src = "../assets/road_level/run_left.png";

var boarSpriteR = new Image();
boarSpriteR.src = "../assets/road_level/run_right.png";

canvas.width = 1200;
canvas.height = 400;

const camera = {
  FOV: 100,
  height: 200,
}

var roadWidth = 1200;
var speed = 20;
var roadMark = 45;
var middleLine = 20;
var newZ = 100;
var playerX = 0;
var offset = 0;
var points = [];
var tickCount = 0;
var ticksPerFrame = 12;
var frames = 4;
var frameIndex = 0;

var treeSprite = [{ x: 0, width: 50 }, { x: 50, width: 50 }, { x: 100, width: 60 }, { x: 160, width: 40 }, { x: 200, width: 60 },
{ x: 260, width: 40 }, { x: 300, width: 65 }, { x: 365, width: 60 }, { x: 425, width: 145 }, { x: 570, width: 170 }]

var dY = calculateDY(camera.FOV);

class Segment {
  constructor(z, c, s, sR, sL, xR, xL, bX, bS, rR) {
    this.x = 0
    this.y = 0;
    this.length = 0;
    this.roadMark = 0;
    this.middleLine = 0;
    this.scale = 0;
    this.z = z;
    this.curve = c;
    this.slope = s;
    this.offset = 0;
    this.treeSpriteR = sR;
    this.treeSpriteL = sL;
    this.treeXr = xR;
    this.treeXl = xL;
    this.boarX = bX;
    this.boarS = bS;
    this.runRight = rR;
    this.hasBoar = false;
  }
  update(i) {
    this.y = ((camera.height + this.slope) * dY) / this.z + canvas.height / 2;
    this.scale = dY / this.z;
    this.offset = playerX * this.scale;
    this.length = roadWidth * this.scale;
    this.roadMark = roadMark * this.scale;
    this.middleLine = middleLine * this.scale;
    this.xR = this.treeXr * this.scale;
    this.xL = this.treeXl * this.scale;
    playerX += offset;
    if (this.boarX > 500) this.runRight = false;
    if (this.boarX < -900) this.runRight = true;
    this.runRight === true ? this.boarX += this.boarS : this.boarX -= this.boarS;
    if (this.z > 0) {
      this.z -= speed;
    }
    else {
      points.slice(i, 1);
    }

  }
}

export function generateRoad(game) {
  if (game.level7Started === false) {
    var sum = 0;
    var sections = [];
    while (sum < 2500) {
      var sectionLength = 20 + 20 * (Math.floor(Math.random() * 3));
      sum += sectionLength;
      sections.push(sectionLength);
    }
    for (let i = 0; i < sections.length; i++) {
      var C = - 2 + (Math.floor(Math.random() * 4));
      var S = - 5 + (Math.floor(Math.random() * 12));

      var newC = 0;
      var newS = 0;
      for (let j = 0; j < sections[i]; j++) {
        var sR = treeSprite[Math.floor(Math.random() * 10)];
        var sL = treeSprite[Math.floor(Math.random() * 10)];
        var xR = 1200 + Math.floor(Math.random() * 700);
        var xL = - 700 - Math.floor(Math.random() * 700);
        var bX = [-900, 500][Math.floor(Math.random() * 2)];
        var rR;
        bX === -900 ? rR = true : rR = false;
        var bS = 2 + Math.floor(Math.random() * 14);
        j < sections[i] / 2 ? newC += C : newC -= C;
        j < sections[i] / 2 ? newS += S : newS -= S;
        var point = new Segment(newZ, newC, newS, sR, sL, xR, xL, bX, bS, rR);
        points.unshift(point)
        newZ += 120
      }
    }
    game.level7Started = true;
  }
}

function calculateDY(FOV) {
  var dY = (canvas.height / 2) / Math.tan((FOV / 2 * Math.PI) / 180);
  return dY;
}

export function drawScenery(ctx) {
  for (let i = 0; i < points.length; i++) {
    points[i].update(i);
  }
  tickCount++;
  checkFrame();
  drawBackground(ctx);
  drawGrass(ctx);
  drawTrees(ctx);
  drawRoad(ctx);
  drawBoars(ctx);
  ctx.drawImage(carSprite, 510, 250, 180, 180);
}

function drawRoad(ctx) {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 5200) {
      ctx.fillStyle = "#969696";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 5200) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].roadMark - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].roadMark - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 5200) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length + points[i].roadMark - points[i].curve + points[i].offset, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length + points[i - 1].roadMark - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + points[i - 1].offset, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 5200) {
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

function drawBackground(ctx) {
  ctx.drawImage(skySprite, 0, 150, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(cloudSprite_1, 0, 0, canvas.width, canvas.height, 600, 100, 400, 100);
  ctx.drawImage(rocksSprite, 360, 350, canvas.width, canvas.height, 0, 50, canvas.width, canvas.height);
  ctx.drawImage(cloudSprite_1, 0, 0, canvas.width, canvas.height, 400, 120, 200, 50);

  ctx.drawImage(groundSprite_1, 300 - playerX * 0.05, 0, 300 + playerX * 0.05, 338, 0, 0, 300 + playerX * 0.05, 338);
  ctx.drawImage(groundSprite_1, 0, 0, 600, 338, 300 + playerX * 0.05, 0, 600, 338);
  ctx.drawImage(groundSprite_1, 0, 0, 300, 338, 900 + playerX * 0.05, 0, 300, 338);

  ctx.drawImage(groundSprite_2, 300 - playerX * 0.1, 0, 300 + playerX * 0.1, 338, 0, 0, 300 + playerX * 0.1, 338);
  ctx.drawImage(groundSprite_2, 0, 0, 600, 338, 300 + playerX * 0.1, 0, 600, 338);
  ctx.drawImage(groundSprite_2, 0, 0, 300, 338, 900 + playerX * 0.1, 0, 300, 338);

  ctx.drawImage(groundSprite_3, 300 - playerX * 0.15, 0, 300 + playerX * 0.15, 338, 0, 0, 300 + playerX * 0.15, 338);
  ctx.drawImage(groundSprite_3, 0, 0, 600, 338, 300 + playerX * 0.15, 0, 600, 338);
  ctx.drawImage(groundSprite_3, 0, 0, 300, 338, 900 + playerX * 0.15, 0, 300, 338);
}

function drawGrass(ctx) {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 5200) {
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

function drawTrees(ctx) {
  for (let i = 0; i < points.length; i++) {
    if (i % 2 === 0 && points[i].z < 5200 && points[i].z > 100) {
      ctx.drawImage(treesSprite, points[i].treeSpriteL.x, 0, points[i].treeSpriteL.width, 150, canvas.width / 2 - points[i].xR + points[i].offset - points[i].curve, points[i].y - points[i].slope - (treesSprite.height * points[i].scale * 3.5), points[i].treeSpriteL.width * points[i].scale * 4, treesSprite.height * points[i].scale * 4)
      ctx.drawImage(treesSprite, points[i].treeSpriteR.x, 0, points[i].treeSpriteR.width, 150, canvas.width / 2 - points[i].xL + points[i].offset - points[i].curve, points[i].y - points[i].slope - (treesSprite.height * points[i].scale * 3.5), points[i].treeSpriteR.width * points[i].scale * 4, treesSprite.height * points[i].scale * 4)
    }
  }
}

function drawBoars(ctx) {
  for (let i = 0; i < points.length; i++) {
    if (i % 7 === 0 && points[i].z < 2200 && points[i].z > 100) {
      points[i].hasBoar = true;
      points[i].runRight === true
        ? ctx.drawImage(boarSpriteR, frameIndex * 71, 0, 69, 50, canvas.width / 2 + (points[i].boarX * points[i].scale) + points[i].offset - points[i].curve, points[i].y - points[i].slope - (100 * points[i].scale), 71 * points[i].scale * 2, 50 * points[i].scale * 2)
        : ctx.drawImage(boarSprite, frameIndex * 71, 0, 69, 50, canvas.width / 2 + (points[i].boarX * points[i].scale) + points[i].offset - points[i].curve, points[i].y - points[i].slope - (100 * points[i].scale), 71 * points[i].scale * 2, 50 * points[i].scale * 2)
    }
  }
}

function checkCollision() {
  for (let i = 0; i < points.length; i++) {
    var checkBoar = canvas.width / 2 + (points[i].boarX * points[i].scale) + points[i].offset - points[i].curve;
    if (points[i].z < 250 && points[i].z > 100 && points[i].hasBoar == true && checkBoar > 300 && checkBoar < 400) return true;
  }
}

export function steer(v) {
  v != 0 ? offset += v : offset = 0;
}

function checkFrame() {
  if (tickCount > ticksPerFrame) {
    tickCount = 0;
    if (frameIndex < frames - 1) {
      frameIndex += 1;
    } else {
      frameIndex = 0;
    }
  }
}
