import { Monster } from "./ghouls.js";

var moblin = new Image();
moblin.src = "../assets/zeldouille/beast_2.png";

export class Moblin extends Monster {
  constructor(map, bundaries, ctx,speed) {
    super(map, bundaries, ctx,speed);
    this.sprite = moblin;
    this.isPiercing = false;
  }
}
