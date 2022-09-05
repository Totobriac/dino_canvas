import { start1 } from "./startLevel10.js";

var videoElement;
var videoDiv;

videoElement = document.createElement("video");
videoDiv = document.createElement('div');
document.body.appendChild(videoDiv);

videoDiv.appendChild(videoElement);
videoDiv.setAttribute("style", "display:none;");

videoElement.setAttribute("src", "./assets/10_tv/video/pauleta.mp4");
videoElement.onended = function() {start1()};



function playVideoPauleta(ctx) {
  videoElement.play();
  ctx.drawImage(videoElement, 200, 0, 1000, 400);
}

function stopVideoPauleta() {
  videoElement.pause();
  videoElement.currentTime = 0;
}

export { playVideoPauleta, stopVideoPauleta };
