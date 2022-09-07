import { drawRoad, drawBackground, drawGrass, drawTrees, drawBoars, drawForest_1, drawForest_2 } from "./drawRoad.js";
import { engineOn, motoFinished, updateVol, strokesSound, vol } from "./startLevel6.js";

var motoSprite = new Image();
motoSprite.src = "./assets/6_race/moto-6.png";

var fallMotoSprite = new Image();
fallMotoSprite.src = "./assets/6_race/fall_moto.png";

var fallDriverSprite = new Image();
fallDriverSprite.src = "./assets/6_race/fall_driver.png";

const camera = {
  FOV: 100,
  height: 200,
}

var roadWidth = 1200;
var speed = 0;
var roadMark = 45;
var middleLine = 20;
var newZ = 100;
var playerX = 0;
var offset = 0;
var points = [];
var tickCount = 0;
var treeSprite = [{ x: 0, width: 50 }, { x: 50, width: 50 }, { x: 100, width: 60 }, { x: 160, width: 40 }, { x: 200, width: 60 },
{ x: 260, width: 40 }, { x: 300, width: 65 }, { x: 365, width: 60 }, { x: 425, width: 145 }, { x: 570, width: 170 }];
var dY = calculateDY(camera.FOV);
var showHotel = 0;
var light = false;

var motoTickCount = 0;
var maxTickCount = 12;
var frame = 0;

var fallTickCount = 0;
var fallMotoFrame = 0;
var fallDriverFrame = 0;

var falling = false;

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
    this.side = Math.floor(Math.random() * 2);
    this.hasBoar;
    this.hasTrunk;
    this.putObstacles();
  }
  putObstacles() {
    var random = Math.floor(Math.random() * 100);
    random > 95 ? this.hasTrunk = true : this.hasTrunk = false;
    random > 90 ? this.hasBoar = true : this.hasBoar = false;
  }
  update() {
    tickCount++;
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
    if (this.z > 1) {
      this.z -= speed;
    }
  }
}

export function generateRoad(game) {
  if (!game.loadedLevel[6]) {
    var sum = 0;
    var sections = [];
    while (sum < 600) {
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
        newZ += 160;
      }
    }
    game.loadedLevel[6] = true;
  }
}

function calculateDY(FOV) {
  var dY = (canvas.height / 2) / Math.tan((FOV / 2 * Math.PI) / 180);
  return dY;
}

export function drawScenery(ctx, game) {

  for (let i = 0; i < points.length; i++) {
    points[i].update();

    if (points[0].z < 600) {
      speed = 0;
      showHotel += 0.005;
      vol > 0.0001 ? updateVol(-0.0001) : strokesSound.stop();
    }
  }

  drawBackground(ctx, playerX, light);

  if (points[0].z > 260) {
    drawForest_1(ctx, playerX);
    drawForest_2(ctx, playerX);
  }
  else {
    if (showHotel >= 400) {
      showHotel = 400;
      light = true;
      setTimeout ( motoFinished, 1500);
    }
    drawForest_1(ctx, showHotel);
    drawForest_2(ctx, -showHotel);
  }
  drawGrass(ctx, points);
  drawTrees(ctx, points);
  drawRoad(ctx, points);
  drawBoars(ctx, points, tickCount);
  steer(game);

  var coll = checkCollision();
  if (coll) falling = true;
  if (falling) speed = 0;

  if (!falling) {
    ctx.drawImage(motoSprite, 50 * frame, 0, 50, 110, 575, 285, 50, 110);
  } else {
    fallAnimation(ctx);
  }
}

function fallAnimation(ctx) {
  fallTickCount++;
  if (fallMotoFrame < 3 && fallTickCount % 10 === 0) fallMotoFrame++;
  ctx.drawImage(fallMotoSprite, 90 * fallMotoFrame, 0, 91, 110, 579, 285, 91, 110);
  if (fallMotoFrame === 3) {
    if (fallTickCount % 10 === 0 && fallDriverFrame < 7) fallDriverFrame++;
    ctx.drawImage(fallDriverSprite, fallDriverFrame * 84, 0, 84, 110, 670, 285, 84, 110);
    if (fallDriverFrame === 7) {
      falling = false;
      fallTickCount = 0;
      fallMotoFrame = 0;
      fallDriverFrame = 0;
    }
  }
}

function checkCollision() {
  for (let i = 0; i < points.length; i++) {
    var checkBoar = canvas.width / 2 + (points[i].boarX * points[i].scale) + points[i].offset - points[i].curve;
    if (points[i].z < 300 && points[i].z > 100 && points[i].hasBoar && checkBoar > 550 && checkBoar < 650) return true;
    var checkTrunk;
    points[i].side === 0
      ? checkTrunk = canvas.width / 2 - (350 * points[i].scale) + points[i].offset - points[i].curve
      : checkTrunk = canvas.width / 2 + (150 * points[i].scale) + points[i].offset - points[i].curve;
    var trunkColl;
    checkTrunk > 625 || checkTrunk + 100 < 575 ? trunkColl = false : trunkColl = true;
    if (points[i].z < 250 && points[i].z > 100 && points[i].hasTrunk && trunkColl) return true;
  }
  return false;
}

export function steer(game) {

  if (game.keyUp.code === "ArrowLeft" || game.keyUp.code === "ArrowRight") {
    offset = 0;
    if (motoTickCount < maxTickCount) {
      motoTickCount++;
    } else {
      motoTickCount = 0;
      frame === 0 ? frame = 1 : frame = 0;
    }
  } else {
    if (game.keyDown.code === 'ArrowLeft' && engineOn) {
      frame = 3;
      if (playerX < 575) offset += 0.002;
    };
    if (game.keyDown.code === 'ArrowRight' && engineOn) {
      frame = 2;
      if (playerX > -575) offset += -0.002;
    };
  }
  playerX > 575 || playerX < -575 || !engineOn ? speed = 0 : speed = 0 ? speed = 20 : speed = 20;

}

export { showHotel };
