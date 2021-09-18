import { normalizeAngle, distBetweenTwoPoints } from "./functions.js";
import { zBuffer } from "./raycasting.js";
var canvasWidth = 600;
var canvasHeight = 400;
const FOV = 60;

var tileSize = 40;
var tiles = new Image();
tiles.src = "../assets/sewer_level/walls.png";

class Ray {

  constructor(con, level, x, y, playerAngle, addedAngle, stripe) {
    this.ctx = con;
    this.level = level;

    this.x = x;
    this.y = y;

    this.addedAngle = addedAngle;
    this.playerAngle = playerAngle;
    this.angle = playerAngle + addedAngle;

    this.wallHitX = 0;
    this.wallHitY = 0;

    this.wallHitXHorizontal = 0;	
    this.wallHitYHorizontal = 0;	
    this.wallHitXVertical = 0;	
    this.wallHitYVertical = 0;


    this.stripe = stripe;		
    this.distance = 0;	

    this.pixelTexture = 0;	
    this.textureId = 0;		

    this.projectPlaneDist = (canvasWidth / 2) / Math.tan(FOV / 2);
  }
  setAngle(angle) {
    this.playerAngle = angle;
    this.angle = normalizeAngle(angle + this.addedAngle);
  }
  cast() {
    this.xIntercept = 0;
    this.yIntercept = 0;

    this.xStep = 0;
    this.yStep = 0;


    this.down = false;
    this.left = false;

    if (this.angle < Math.PI)
      this.down = true;

    if (this.angle > Math.PI / 2 && this.angle < 3 * Math.PI / 2)
      this.left = true;


    var horizontalHit = false;	
    this.yIntercept = Math.floor(this.y / tileSize) * tileSize;


    if (this.down)
      this.yIntercept += tileSize;		

     var adjacente = (this.yIntercept - this.y) / Math.tan(this.angle);	
    this.xIntercept = this.x + adjacente;

    
    this.yStep = tileSize;
    this.xStep = this.yStep / Math.tan(this.angle);	

    
    if (!this.down)
      this.yStep = -this.yStep;

      if ((this.left && this.xStep > 0) || (!this.left && this.xStep < 0)) {
      this.xStep *= -1;
    }

    
    var nextXHorizontal = this.xIntercept;
    var nextYHorizontal = this.yIntercept;

    if (!this.down)
      nextYHorizontal--;

      while (!horizontalHit) {

      var squareX = parseInt(nextXHorizontal / tileSize);
      var squareY = parseInt(nextYHorizontal / tileSize);
      if (this.level.colision(squareX, squareY)) {
        horizontalHit = true;
        this.wallHitXHorizontal = nextXHorizontal;
        this.wallHitYHorizontal = nextYHorizontal;
      }
      else {
        nextXHorizontal += this.xStep;
        nextYHorizontal += this.yStep;
      }
    }


    var verticalHit = false;	

    this.xIntercept = Math.floor(this.x / tileSize) * tileSize; 		


    if (!this.left)
      this.xIntercept += tileSize;


      var opposite = (this.xIntercept - this.x) * Math.tan(this.angle);
    this.yIntercept = this.y + opposite;

    
    this.xStep = tileSize;								

    if (this.left)
      this.xStep *= -1;
    this.yStep = tileSize * Math.tan(this.angle);	

    if ((!this.down && this.yStep > 0) || (this.down && this.yStep < 0)) {
      this.yStep *= -1;
    }

    
    var nextXVertical = this.xIntercept;
    var nextYVertical = this.yIntercept;

    if (this.left)
      nextXVertical--;

      while (!verticalHit && (nextXVertical >= 0 && nextYVertical >= 0 && nextXVertical < canvasWidth && nextYVertical < canvasHeight)) {

      var squareX = parseInt(nextXVertical / tileSize);
      var squareY = parseInt(nextYVertical / tileSize);
      if (this.level.colision(squareX, squareY)) {
        verticalHit = true;
        this.wallHitXVertical = nextXVertical;
        this.wallHitYVertical = nextYVertical;
      }
      else {
        nextXVertical += this.xStep;
        nextYVertical += this.yStep;
      }
    }
    var horizontalDistance = 9999;
    var verticalDistance = 9999;

    if (horizontalHit) {
      horizontalDistance = distBetweenTwoPoints(this.x, this.y, this.wallHitXHorizontal, this.wallHitYHorizontal);
    }
    if (verticalHit) {
      verticalDistance = distBetweenTwoPoints(this.x, this.y, this.wallHitXVertical, this.wallHitYVertical);
    }
    if (horizontalDistance < verticalDistance) {
      this.wallHitX = this.wallHitXHorizontal;
      this.wallHitY = this.wallHitYHorizontal;
      this.distance = horizontalDistance;

      var square = parseInt(this.wallHitX / tileSize);
      this.pixelTexture = this.wallHitX - (square * tileSize);

      this.textureId = this.level.tile(this.wallHitX, this.wallHitY);
    }
    else {
      this.wallHitX = this.wallHitXVertical;
      this.wallHitY = this.wallHitYVertical;
      this.distance = verticalDistance;

      var square = parseInt(this.wallHitY / tileSize) * tileSize;
      this.pixelTexture = this.wallHitY - square;

      this.textureId = this.level.tile(this.wallHitX, this.wallHitY);
    }

    this.distance = this.distance * (Math.cos(this.playerAngle - this.angle));

    zBuffer[this.stripe] = this.distance;
  }

  renderWalls() {
    var tileHeightile = 400;
    var wallHeight = (tileHeightile / this.distance) * this.projectPlaneDist;

    var y0 = parseInt(canvasHeight / 2) - parseInt(wallHeight / 2);
    var y1 = y0 + wallHeight;
    var x = this.stripe;

    var heightTileTexture = 64;
    var textureHeight = y0 - y1;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(tiles, this.pixelTexture, ((this.textureId - 1) * heightTileTexture), this.pixelTexture, 63, x + 300, y1, 1, textureHeight);
  }
  draw() {
    this.cast();
    this.renderWalls();
  }
}

export { Ray }