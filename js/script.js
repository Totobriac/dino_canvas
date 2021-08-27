import { Dino } from "./dino.js"
import { createCactus } from "./cactus.js"

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 1200;

const dino = new Dino();
let frame = 0;
let score = 0;
let gamespeed = 2.5;
let isPlaying = false;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  createCactus(frame, gamespeed, ctx);
  requestAnimationFrame(animate);
  dino.update(ctx);
  dino.draw(ctx, isPlaying);
  frame++;
}

animate();

window.addEventListener('keydown', function (e) {
  if (e.code === "Space" && dino.y == 301) {
    dino.jump();
    isPlaying = true;
  }
})


