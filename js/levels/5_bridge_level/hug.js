import { endGame } from "./startLevel5.js";
import { partition } from "./piano.js";

var hug = new Image();
hug.crossOrigin = 'anonymous';
hug.src = "./assets/5_bridge/hug.png";

var night = new Image();
night.crossOrigin = 'anonymous';
night.src = "./assets/5_bridge/starry_night_stars.png";

var tempCanvas = document.createElement('canvas');
var tempContext = tempCanvas.getContext('2d');

var tempCanvas2 = document.createElement('canvas');
var tempContext2 = tempCanvas2.getContext('2d');

tempCanvas.width = 350;
tempCanvas.height = 350;

tempCanvas2.width = 1200;
tempCanvas2.height = 400;


var init = false;
var init2 = false;
var imageData;
var imageData2;
var alpha = 0;
var distortion = 20;

var g;
var glowR = 0;
var countUp = true;

var hasEnded = false;

var takeSnap = false;

if (!init) {
  hug.onload = () => {
    tempContext.drawImage(hug, 0, 0, 350, 350);
    imageData = tempContext.getImageData(0, 0, 350, 350);
    init = true;
  }
}

if (!init2) {
  night.onload = () => {
    tempContext2.drawImage(night, 0, 0, 1200, 400);
    imageData2 = tempContext2.getImageData(0, 0, 1200, 400);
    init2 = true;
  }
}

function drawHug(ctx) {

  // if (alpha > 90 && distortion > 0.05) distortion -= 0.05;

  var data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] != 0 || data[i + 1] != 0 || data[i + 2] != 0) {
      data[i + 3] = Math.floor(Math.random() * alpha * 3 + alpha * 2);
    }
  };
  if (!hasEnded) {
    tempContext.putImageData(imageData, 0, 0);
    for (let i = 0; i < 350; i++) {
      ctx.drawImage(tempCanvas, 0, i, 350, 1, 375 + Math.sin(Math.random()) * distortion, i, 350, 1);
    }
  }

  if (partition.length < 1 && !hasEnded) {
    if (alpha < 90 || distortion > 0.05 && !hasEnded) {
      if (distortion > 0.05) distortion -= 0.05;
      if (alpha < 90) alpha += 0.25;
    } else {
      hasEnded = true;
      alpha = 0;
    }    
  }  

  if (hasEnded) {
    drawStars(ctx);
    glow();
    ctx.save();
    ctx.shadowColor = "yellow";
    ctx.shadowBlur = glowR;
    ctx.drawImage(hug, 375, 0, 350, 350);
    ctx.restore();

    if (takeSnap) {
      var snap = ctx.getImageData(0, 0, 1200, 400);
      endGame(ctx, snap);
    };
  }
}

function glow() {
  countUp ? g = 0.2 : g = -0.2;
  glowR += g;
  if (glowR > 25 || glowR < 0) countUp = !countUp;
}

function drawStars(ctx) {
  if (alpha < 225) {
    alpha += 1.2;
  } else {
    takeSnap = true;
  }
  var data = imageData2.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] != 0 || data[i + 1] != 0 || data[i + 2] != 0) {
      data[i + 3] = Math.floor(Math.random() * alpha + alpha / 2);
    }
  }
  tempContext2.putImageData(imageData2, 0, 0);
  ctx.drawImage(tempCanvas2, 0, 0);
}

function updateAlpha(n) {
  alpha += n;
}

export { drawHug, updateAlpha };
