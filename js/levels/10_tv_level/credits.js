import { soundPlayer } from "./sounds.js";
import { lines } from "./lines.js";

var videoElement;
var videoDiv;

var derrickIstHier = true;

var yOffset = 400;

videoElement = document.createElement("video");
videoDiv = document.createElement('div');
document.body.appendChild(videoDiv);

videoDiv.appendChild(videoElement);
videoDiv.setAttribute("style", "display:none;");

videoElement.setAttribute("src", "./assets/10_tv/video/derrick.mp4");

function drawCredits(ctx) {

  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(230, 0, 700, 400);
  ctx.restore();

  if (derrickIstHier) {
    ctx.drawImage(videoElement, 230, 0, 700, 400);
    videoElement.currentTime < videoElement.duration - 0.5 ? videoElement.play() : credits(ctx);
  }
}

function credits(ctx) {
  soundPlayer(5);
  videoElement.pause();
  drawEndCredits(ctx);
}

function drawEndCredits(ctx) {
  yOffset -= 0.25;
  for (let i = 0; i < lines.length; i++) {
    drawLine(ctx, lines[i], i)
  }
}

function drawLine(ctx, text, index) {

  var width = ctx.measureText(text);
  var v = width.width
  var x = 250 + (655 - v) / 2;

  ctx.font = "25px verdana";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 9;
  ctx.lineWidth = 5;
  ctx.strokeText(text, x, yOffset + index * 35);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgb(208,208,202)";
  ctx.fillText(text, x, yOffset + index * 35);
}

export { drawCredits };
