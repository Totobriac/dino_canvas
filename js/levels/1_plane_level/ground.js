import { sound } from "../../sound.js";
var music = new sound("../assets/1_plane/himno.mp3");

import { landing } from "./plane.js";

var monuIndex = 0;

var monuSprites = ["./assets/1_plane/liberty.png","./assets/1_plane/pagoda.png","./assets/1_plane/cn_tower.png",
                    "./assets/1_plane/scottish.png","./assets/1_plane/thai.png","./assets/1_plane/russian.png", "./assets/1_plane/sol.png"];

var statue = new Image();
var angle;
var stop = false;
var banderaY = 1490;

var sWidth = 200;
var sHeight = 200;

var origin = {x: 600, y: 1200 };
var radius = 900;
var start = 0.9272951769;
var end = 2.21429922;

let step = 0;
var totalSteps = 700;
var stepSize = (end - start)/totalSteps;

export function animateMonument(ctx, game) {

  if (step === totalSteps) {
    step = 0;
    if (game.levelDone) {
      monuIndex = 6;
      stop = true;     
    } else {
      monuIndex === monuSprites.length - 2 ? monuIndex = 0 : monuIndex++;
    }
  }

  if (!stop) {
    angle = start + step++ * stepSize;
  } else {
    if (step < 350) {
      angle = start + step++ * stepSize;
      banderaY -= 0.55;
    }
    else {
      landing();
    }
  }


  ctx.translate(origin.x, origin.y);

  ctx.fillStyle = "#75AADB";
  ctx.beginPath();
  ctx.arc(0, 50, 900, 0, 2 * Math.PI);
  ctx.fill();

  ctx.save();
  ctx.strokeStyle = "#75AADB";
  ctx.lineWidth = 190;
  ctx.beginPath();
  ctx.arc(0, 50, banderaY, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();

  ctx.resetTransform();

  ctx.translate(origin.x, origin.y);
  ctx.rotate(-angle);

  ctx.translate(radius, 0);
  ctx.rotate(Math.PI/2);

  ctx.translate(-sWidth/2, -sHeight/1.4);

  statue.src = monuSprites[monuIndex];

  ctx.drawImage(statue, 0, 0, sWidth, sHeight);
  ctx.resetTransform();
}
