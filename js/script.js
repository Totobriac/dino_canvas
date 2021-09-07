import { Dino } from "./character/dino.js"
import { Game } from "./game.js";
import { anim } from "./animate.js"
import { Control } from "./controls.js";


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 1200;

const dino = new Dino();
const game = new Game();
const control = new Control(dino, game);


function animate() {
  anim(game, dino, ctx);  
  requestAnimationFrame(animate);
}

animate();
