import { distance, normalizeAngle } from "./functions.js";
import { floorData } from "./init.js";
import { getTextNb } from "./zone.js";

var wallsSprite = new Image();
wallsSprite.src = "./assets/9_dinoStein/walls2.png";

var zBuffer = [];

export class Ray {
  constructor(player, map, ctx, angleR, screenDist, i) {
    this.player = player;
    this.x = player.x;
    this.y = player.y;
    this.dist = 0;
    this.map = map;
    this.ctx = ctx;
    this.yIntercept;
    this.xIntercept;
    this.xStep;
    this.yStep;
    this.angleR = angleR;
    this.isHittingX;
    this.isHittingY;
    this.wallHitHX;
    this.wallHitHY;
    this.wallHitVX;
    this.wallHitVY;
    this.wallHitX;
    this.wallHitY;
    this.angle = this.player.angle + this.angleR;
    this.lookUp;
    this.lookRight;
    this.index = i;
    this.distHit = 0;
    this.texturePix;
    this.texture;
    this.screenDist;
    this.floorPointx;
    this.floorPointy;
    this.screenDist = screenDist;
    this.wallToBorder;
    this.snow = 34;
    this.tickCount = 0;
    this.maxTicount = 6;
  }
  update() {
    this.angle = this.player.angle + this.angleR;
    this.angle = normalizeAngle(this.angle)
    this.angle > Math.PI ? this.lookUp = true : this.lookUp = false;
    this.angle > Math.PI / 2 && this.angle < (3 * Math.PI) / 2 ? this.lookRight = false : this.lookRight = true;
    this.x = this.player.x;
    this.y = this.player.y;
    this.animateScreen();
  }
  cast(floorSprite) {
    this.update();
    this.collision();
    this.checkTile();
    this.wallRendering(floorSprite);
  }
  animateScreen() {
    if (this.tickCount > this.maxTicount) {
      this.tickCount = 0;
      this.snow < 36 ? this.snow++ : this.snow = 34;
      this.side1 < 42 ? this.side1++ : this.side1 = 40;
      this.side2 < 46 ? this.side2++ : this.side2 = 44;

    } else {
      this.tickCount++;
    }
  }
  collision() {

    // yCollision

    this.isHittingY = false;
    this.yIntercept = Math.floor(this.y / 64) * 64;
    if (!this.lookUp) this.yIntercept += 64;
    var xOffset = (this.yIntercept - this.y) / Math.tan(this.angle);
    this.xIntercept = this.x + xOffset;
    this.xStep = 64 / Math.tan(this.angle);
    this.yStep = 64;
    if (this.lookUp) this.yStep *= -1;
    if ((!this.lookRight && this.xStep > 0) || (this.lookRight && this.xStep < 0)) {
      this.xStep *= -1;
    }
    var nextHorizX = this.xIntercept;
    var nextHorizY = this.yIntercept;
    if (this.lookUp) {
      nextHorizY--;
    }
    while (!this.isHittingY) {
      var xTile = Math.floor(nextHorizX / 64);
      var yTile = Math.floor(nextHorizY / 64);
      if (this.map.checkCollision(yTile, xTile, nextHorizX, nextHorizY, this.angle, "yCollision", this.lookUp)) {
        this.isHittingY = true;
        this.wallHitHX = nextHorizX;
        this.wallHitHY = nextHorizY;
      } else {
        nextHorizX += this.xStep;
        nextHorizY += this.yStep;
      }
    }

    // xCollision

    this.isHittingX = false;
    this.xIntercept = Math.floor(this.x / 64) * 64;
    if (this.lookRight) this.xIntercept += 64;
    var yOffset = (this.xIntercept - this.x) * Math.tan(this.angle);
    this.yIntercept = this.y + yOffset;
    this.xStep = 64;
    this.yStep = 64 * Math.tan(this.angle);
    if (!this.lookRight) this.xStep *= -1;
    if ((this.lookUp && this.yStep > 0) || (!this.lookUp && this.yStep < 0)) {
      this.yStep *= -1;
    }
    var nextHorizX = this.xIntercept;
    var nextHorizY = this.yIntercept;
    if (!this.lookRight) {
      nextHorizX--;
    }
    var mapWidth = this.map.mapX * 64;
    var mapHeight = this.map.mapY * 64;
    while (!this.isHittingX && (nextHorizX > 1 && nextHorizY > 1 && nextHorizX < mapWidth - 1 && nextHorizY < mapHeight - 1)) {
      var xTile = Math.floor(nextHorizX / 64);
      var yTile = Math.floor(nextHorizY / 64);
      if (this.map.checkCollision(yTile, xTile, nextHorizX, nextHorizY, this.angle, "xCollision", this.lookRight)) {
        this.isHittingX = true;
        this.wallHitVX = nextHorizX;
        this.wallHitVY = nextHorizY;
      } else {
        nextHorizX += this.xStep;
        nextHorizY += this.yStep;
      }
    }
  }
  checkTile() {
    var horizDst = 999999;
    var vertiDst = 999999;
    var square;
    if (this.isHittingY) {
      vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);
      var tex = this.map.getTile(this.wallHitHX, this.wallHitHY, "wall");
      if (tex && (tex == 25 || tex == 24) && !this.lookUp) {
        this.wallHitHX += 32 / Math.tan(this.angle);
        this.wallHitHY += 32;
        vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);
      } else if (tex && (tex == 25 || tex === 24) && this.lookUp) {
        this.wallHitHX -= 32 / Math.tan(this.angle);
        this.wallHitHY -= 32;
        vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);
      }
    }
    if (this.isHittingX) {
      horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
      var tex = this.map.getTile(this.wallHitVX, this.wallHitVY, "wall");
      if (tex == 25 || tex === 24 && this.lookRight) {
        this.wallHitVX += 32;
        this.wallHitVY += 32 * Math.tan(this.angle);
        horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
      } else if (tex == 25 || tex === 24 && !this.lookRight) {
        this.wallHitVX -= 32;
        this.wallHitVY -= 32 * Math.tan(this.angle);
        horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
      }
    }
    if (horizDst < vertiDst) {
      this.wallHitX = this.wallHitVX;
      this.wallHitY = this.wallHitVY;
      this.distHit = horizDst;
      square = Math.floor(this.wallHitY / 64);
      this.texturePix = Math.floor(this.wallHitY) - (square * 64);
      this.texture = this.map.getTile(this.wallHitX, this.wallHitY, "wall");
      switch (Number(this.texture)) {
        case 96:
          this.texture = 6;
          break;
        case 90:
          this.texture = 22;
          break;
        case 91:
          this.texture = 14;
          break;
        case 69:
        case 68:
        case 92:
        case 93:
          this.texture = 26;
          break;
        case 82:
          this.lookRight ? this.texture = 18 : this.texture = 30;
          break;
        case 83:
          this.lookRight ? this.texture = 20 : this.texture = 32;
          break;
        case 84:
          this.lookRight ? this.texture = 32 : this.texture = 6;
          break;
        case 85:
          this.lookRight ? this.texture = 30 : this.texture = 6;
          break;
      }
    } else {
      this.wallHitX = this.wallHitHX;
      this.wallHitY = this.wallHitHY;
      this.distHit = vertiDst;
      square = Math.floor(this.wallHitX / 64) * 64;
      this.texturePix = Math.floor(this.wallHitX) - square;
      this.texture = this.map.getTile(this.wallHitX, this.wallHitY, "wall");
      switch (Number(this.texture)) {
        case 96:
        case 90:
        case 91:
          this.texture = 26;
          break;
        case 68:
          this.texture = 18;
          break;
        case 69:
          this.texture = 6;
          break;
        case 92:
          this.texture = 14;
          break;
        case 93:
          this.texture = 16;
          break;
        case 80:
          this.lookUp ? this.texture = 30 : this.texture = 22;
          break;
        case 81:
          this.lookUp ? this.texture = 32 : this.texture = 22;
          break;
        case 99:
          this.lookUp ? this.texture = this.snow : this.texture = 22;
          break;
        case 98:
          this.lookUp ? this.texture = this.side1 : this.texture = 22;
          break;
        case 97:
          this.lookUp ? this.texture = this.side2 : this.texture = 22;
          break;

      }
      this.texture++;
    }
    this.distHit = this.distHit * Math.cos(this.player.angle - this.angle);

    zBuffer[this.index] = this.distHit;
  }
  wallRendering(floorSprite) {

    var realWallHeight = 64;

    var wallHeight = (realWallHeight / this.distHit) * this.screenDist;

    var y = 200 - Math.floor(wallHeight / 2);

    var line = Math.floor(this.texture / 10);
    var col = this.texture - (line * 10);

    this.ctx.imageSmoothingEnabled = false;

    if (this.texture != 24 && this.texture != 25) {
      this.ctx.drawImage(
        wallsSprite,
        col * 64 + this.texturePix,
        line * 64,
        1,
        63,
        this.index + 300,
        y,
        1,
        wallHeight
      );
    }
    else {
      var X = Math.floor(this.wallHitX / 64);
      var Y = Math.floor(this.wallHitY / 64);
      var i = this.map.getDoor(X, Y);

      var yO;
      this.texture === 24 ? yO = 4 : yO = 5;

      this.ctx.drawImage(
        wallsSprite,
        (yO * 64) + this.texturePix - this.map.doors[i].yOffset,
        128,
        1,
        63,
        this.index + 300,
        y,
        1,
        wallHeight
      );
    }

    this.wallToBorder = Math.floor((400 - wallHeight) / 2);

    // we calculate the distance between the first pixel at the bottom of the wall and the player eyes (canvas.height / 2)
    var pixelRowHeight = 199 - this.wallToBorder;

    // then we loop through every pixels until we reach the border of the canvas
    if (this.index % 2 === 0) {

      for (let i = pixelRowHeight; i < 199; i += 1) {

        // we calculate the straight distance between the player and the pixel
        var directDistFloor = (this.screenDist * 200) / i;

        // we calculate it's real world distance with the angle relative to the player       


        var realDistance = (directDistFloor / Math.cos(Math.abs(this.angleR))) / 6.4;


        // we calculate it's real world coordinates with the player angle
        // 5.19 = this.screenDist / 100


        this.floorPointX = this.player.x + Math.cos(this.angle) * realDistance;
        this.floorPointY = this.player.y + Math.sin(this.angle) * realDistance;

        var textNb = getTextNb(this.floorPointX, this.floorPointY);

        if (textNb) {

          var floorYOffset = Math.floor(textNb[0] / 10) * 64;
          var floorXOffset = (textNb[0] - (floorYOffset / 6.4)) * 64;

          var floorTextX = Math.floor(this.floorPointX % 64) + floorXOffset;
          var floorTextY = Math.floor(this.floorPointY % 64) + floorYOffset;


          var ceilingYOffset = Math.floor(textNb[1] / 10) * 64;
          var ceilingXOffset = (textNb[1] - (ceilingYOffset / 6.4)) * 64;

          var ceilingTextX = Math.floor(this.floorPointX % 64) + ceilingXOffset;
          var ceilingTextY = Math.floor(this.floorPointY % 64) + ceilingYOffset;

          if (floorData) {

            var shade = i - 150;

            var floorIndex = floorTextY * 2304 + floorTextX * 4;
            var ceilingIndex = ceilingTextY * 2304 + ceilingTextX * 4;

            for (let j = 0; j < 3; j++) {
              floorSprite.data[((this.index * 4)) + (i + 200) * 2400 + j] = floorData.data[floorIndex + j] + shade;
              floorSprite.data[(this.index + 1) * 4 + (i + 200) * 2400 + j] = floorData.data[floorIndex + j] + shade;

              floorSprite.data[((this.index * 4)) + (200 - i) * 2400 + j] = floorData.data[ceilingIndex + j] + shade;
              floorSprite.data[((this.index + 1)) * 4 + (200 - i) * 2400 + j] = floorData.data[ceilingIndex + j] + shade;
            }
          }
        }
      }
    }
  }
}

export { zBuffer };
