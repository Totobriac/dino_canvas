import { drawRoad, drawBackground, drawGrass, drawTrees, drawBoars, drawForest_1, drawForest_2 } from "./drawRoad.js";

var carSprite = new Image();
carSprite.src = "./assets/6_race/red_coupe.png";

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
var treeSprite = [{ x: 0, width: 50 }, { x: 50, width: 50 }, { x: 100, width: 60 }, { x: 160, width: 40 }, { x: 200, width: 60 },
{ x: 260, width: 40 }, { x: 300, width: 65 }, { x: 365, width: 60 }, { x: 425, width: 145 }, { x: 570, width: 170 }];
var dY = calculateDY(camera.FOV);
var showHotel = 0;
var light = false;

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
  if (game.loadedLevel[6] === false) {
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
        newZ += 160
      }
      game.loadedLevel[6] = true;
    }
  }
}
function calculateDY(FOV) {
  var dY = (canvas.height / 2) / Math.tan((FOV / 2 * Math.PI) / 180);
  return dY;
}

export function drawScenery(ctx, game) {
  for (let i = 0; i < points.length; i++) {
    points[i].update(i);
    if (points[0].z < 220) {
      speed = 0;
      showHotel += 0.01;
    }
  }
  drawBackground(ctx, playerX, light);
  if (points[0].z > 220) {
    drawForest_1(ctx, playerX);
    drawForest_2(ctx, playerX);
  }
  else {
    if (showHotel >= 400) {
      showHotel = 400;
      light = true;
    }
    drawForest_1(ctx, showHotel);
    drawForest_2(ctx, -showHotel);
  }
  drawGrass(ctx, points);
  drawTrees(ctx, points);
  drawRoad(ctx, points);
  drawBoars(ctx, points, tickCount);
  steer(game);
  ctx.drawImage(carSprite, 510, 250, 180, 180);
}

function checkCollision() {
  for (let i = 0; i < points.length; i++) {
    var checkBoar = canvas.width / 2 + (points[i].boarX * points[i].scale) + points[i].offset - points[i].curve;
    if (points[i].z < 250 && points[i].z > 100 && points[i].hasBoar == true && checkBoar > 300 && checkBoar < 400) return true;
  }
}

export function steer(game) {
 if (game.keyUp.code === "ArrowLeft" || game.keyUp.code === "ArrowRight") {
    offset = 0;
  }
  else {
    if (game.keyDown.repeat) {
      return;}
    if (game.keyDown.code === 'ArrowLeft') {
      offset += 0.002;
    };
    if (game.keyDown.code === 'ArrowRight') {
      offset += -0.002;
    };
  }
}
