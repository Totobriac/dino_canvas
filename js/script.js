import { Dino } from "./dino.js"
import { createCactus } from "./cactus.js"
import { generateFloor } from "./floor.js";
import { generateBack } from "./desertBack.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 1200;

const dino = new Dino();
let frame = 0;
let score = 0;
let gamespeed = 4 ;
let isPlaying = false;
let isJumping = true;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateBack(ctx, gamespeed);
  generateFloor(ctx, gamespeed);
  createCactus(frame, gamespeed, ctx);  
  dino.update(ctx);
  dino.draw(ctx, isPlaying, isJumping);
  frame++;
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('keydown', function (e) {
  if (e.code === "Space" && dino.y == 301) {
    dino.jump();
    isPlaying = true;
    isJumping = true;
    setTimeout(() => isJumping = false, 820)
  }
})


