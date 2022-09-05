import { soundPlayer } from "./sounds.js";

var videoElement;
var videoDiv;

var derrickIstHier = true;

videoElement = document.createElement("video");
videoDiv = document.createElement('div');
document.body.appendChild(videoDiv);

videoDiv.appendChild(videoElement);
videoDiv.setAttribute("style", "display:none;");

videoElement.setAttribute("src", "./assets/10_tv/video/derrick.mp4");
videoElement.onended = function() {credits()};

function drawCredits(ctx) {

  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(230, 0, 700, 400);
  ctx.restore();

  if (derrickIstHier) {
    ctx.drawImage(videoElement, 230, 0, 700, 400);
    videoElement.play();
  }  else {
    console.log("dd");
    soundPlayer(5);
  }
}

function credits() {
  derrickIstHier = false;
  videoElement.pause();
}

export { drawCredits };
