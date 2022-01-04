import { Dino } from "./character/dino.js"
import { Game } from "./game.js";
import { anim } from "./animate.js"
import { Control } from "./controls.js";


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 1200;

const dino = new Dino();
const game = new Game();
const control = new Control(dino, game);

var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

function animate() {
  requestAnimationFrame(animate);

  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    anim(game, dino, ctx);
    then = now - (delta % interval);
  }
}

animate();

export { dino, game }
