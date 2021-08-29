import { Dino } from "./dino.js"
import { createCactus } from "./cactus.js"
import { generateFloor } from "./floor.js";
import { generateBigBack, generateSmallBack } from "./desertBack.js";
import { generateBillb } from "./billboard.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 1200;

const dino = new Dino();
let frame = 0;
let score = 0;
let gamespeed = 4;
let isPlaying = false;
let isJumping = true;

let bino = false

function animate() {
  if (bino === false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateBigBack(ctx, gamespeed);
    generateBillb(ctx, gamespeed, 87, 78, false)
    generateSmallBack(ctx, gamespeed);
    generateFloor(ctx, gamespeed);
    createCactus(frame, gamespeed, ctx);
    dino.update(ctx);
    dino.draw(ctx, isPlaying, isJumping);
    frame++;
    requestAnimationFrame(animate);
  }
  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateBillb(ctx, 0, 524, 418, true)
    requestAnimationFrame(animate);
  }
}

animate();

window.addEventListener('keydown', function (e) { 
  if (e.code === "Space" && dino.y == 301) {
    dino.jump();
    isPlaying = true;
    isJumping = true;
    setTimeout(() => isJumping = false, 820)
  }
  else if (e.code ==="KeyB") {
    bino = true;
  }
})

window.addEventListener('keyup', function (e) {
  console.log(e.code)
  if (e.code ==="KeyB") {
    bino = false;
  }
})


