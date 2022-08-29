import { Monster } from "./ghouls.js";

var lynel = new Image();
lynel.src = "./assets/8_zeldouille/lynel.png";

export class Lynel extends Monster {
  constructor(map, bundaries, ctx, speed) {
    super(map, bundaries, ctx,speed);
    this.sprite = lynel;
    this.isPiercing = true;
  }
}
