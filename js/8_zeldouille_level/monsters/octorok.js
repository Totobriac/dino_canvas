import { Monster } from "./ghouls.js";

var octorok = new Image();
octorok.src = "../assets/8_zeldouille/beast_1.png";

export class Octorok extends Monster {
  constructor(map, bundaries, ctx, speed) {
    super(map, bundaries, ctx, speed);
    this.sprite = octorok;
    this.isPiercing = false;
  }
}
