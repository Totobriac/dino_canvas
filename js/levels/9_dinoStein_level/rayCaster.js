import { Ray } from "./ray.js";
import { toRadians } from "./functions.js";

var floorSprite;

class RayCaster {
  constructor(player, map, ctx) {
    this.player = player;
    this.map = map;
    this.ctx = ctx;
    this.rayNb = canvas.width / 2;
    this.rays = [];
    this.incAngle = toRadians(this.player.FOV / this.rayNb);
    this.startAngle = toRadians(this.player.angle - this.player.FOV / 2);
    this.rayAngle = this.startAngle;
    this.screenDist = Math.floor((canvas.width / 4) / Math.tan((30 * Math.PI) / 180));
    this.init();
  }
  init() {
    floorSprite = this.ctx.createImageData(600, 400);

    for (let i = 0; i < floorSprite.data.length; i += 4) {
      floorSprite.data[i + 0] = 65;
      floorSprite.data[i + 1] = 65;
      floorSprite.data[i + 2] = 65;
      floorSprite.data[i + 3] = 255;
    }

    for (let i = 0; i < this.rayNb; i++) {
      this.rays[i] = new Ray(this.player, this.map, this.ctx, this.rayAngle, this.screenDist, i);
      this.rayAngle += this.incAngle;
    }
  }
  draw() {

    this.ctx.putImageData(floorSprite, 300, 0, 0, 0, 600, 399);

    for (let i = 0; i < canvas.width / 2; i++) {
      this.rays[i].cast(floorSprite);
    }

  }
}
export { RayCaster, floorSprite };
