const keys = [["Bb4", 0, 2], ["G5", 8, 5], ["F5", 7, 2], ["G5", 8, 2], ["F5", 7, 5.6], ["Eb5", 5, 3.7], ["Bb4", 0, 2], ["G5", 8, 3.7], ["C5", 2, 1.9], ["C6", 11, 4],
["G5", 8, 1.9], ["Bb5", 10, 5.6], ["Ab5", 9, 3.8], ["G5", 8, 1.9], ["F5", 7, 5.8], ["G5", 8, 3.8], ["D5", 4, 1.9], ["Eb5", 5, 5.7], ["C5", 2, 5.7], ["Bb4", 0, 2],
["D6", 13, 2], ["C6", 11, 2], ["Bb5", 10, 1], ["Ab5", 9, 1], ["G5", 8, 1], ["Ab5", 9, 1], ["C5", 2, 1], ["D5", 4, 1], ["Eb5", 5, 5.7], ["silence", 99, 3.8],
["Bb4", 0, 2], ["G5", 8, 5.7], ["F5", 7, 1], ["G5", 8, 1], ["F5", 7, 1], ["E5", 6, 1], ["F5", 7, 1], ["G5", 8, 1], ["F5", 7, 2], ["Eb5", 5, 4.7],
["F5", 7, 1], ["Eb5", 5, 1], ["D5", 4, 1], ["Eb5", 5, 1], ["F5", 7, 1], ["G5", 8, 1], ["B4", 1, 1], ["C5", 2, 1], ["Db5", 3, 1], ["C5", 2, 1],
["F5", 7, 1], ["E5", 6, 1], ["Ab5", 9, 1], ["G5", 8, 1], ["Db6", 12, 1], ["C6", 11, 1], ["G5", 8, 1], ["Bb5", 10, 5.7], ["Ab5", 9, 3.8], ["F5", 7, 1.9],
["F5", 7, 5.7], ["G5", 8, 1.9], ["G5", 8, 1.9], ["D5", 4, 1.9], ["Eb5", 5, 5.7], ["C5", 2, 5.7], ["Bb4", 0, 2], ["D6", 13, 2], ["C6", 11, 2], ["Bb5", 10, 1],
["Ab5", 9, 1], ["G5", 8, 1], ["Ab5", 9, 0.5], ["Ab5", 9, 0.5], ["C5", 2, 1], ["D5", 4, 1], ["Eb5", 5, 7.1]];

var partition = [];
var oldFrame = 0;
var audio_file = "./assets/5_bridge/piano_mp3/B4.mp3";

var arrows = ["right", "left", "up", "down"];

var arrow = new Image();

var arrowIcon = {
  side : undefined,
  x : 1200,
}

let audio;

class Key {
  constructor(name, index, length) {
    this.name = name;
    this.index = index;
    this.length = length;
    this.file = name + ".mp3";
    this.y;
    this.getTime();
    this.color;
    this.arrow = Math.floor(Math.random() * 4);
  }
  getTime() {
    var sum = 0;
    for (let i = 0; i < partition.length; i++) {
      sum += keys[i][2];
    }
    this.y = -sum * 30 - this.length * 30;
  }
  drawTile(ctx) {
    this.updateTile();
    this.checkCollision();
    ctx.fillStyle = this.color;
    ctx.fillRect(60 * this.index + 180, this.y, 30, this.length * 30);
  }
  updateTile() {
    this.y += 1.2;
  }
  checkCollision() {
    if (this.y + (this.length * 30) < 300 || this.y > 300) {
      this.color = "rgb(148, 224, 247)";
    }
    else {
      this.color = "rgb(0, 170, 222)";
      audio_file = "./assets/5_bridge/piano_mp3/" + this.file;
      audio = new Audio(audio_file);
      arrowIcon.side = this.arrow;
      arrowIcon.x = 60 * this.index + 180;
    }
  }
}

export function generatePiano(ctx, frame) {
  if (partition.length === 0) {
    for (let i = 0; i < keys.length; i++) {
      partition.push(new Key(keys[i][0], keys[i][1], keys[i][2]))
    }
    oldFrame = frame;
  }
  if (frame > oldFrame + 900) {
    for (let i = 0; i < partition.length; i++) {
      if (partition[i].y > 400) {
        partition.splice(i,1);
        i--;
      } else {
        partition[i].drawTile(ctx);
      }
    }
    drawLine(ctx);
  }
}

function drawLine(ctx) {
  arrow.src = "./assets/5_bridge/" + arrows[arrowIcon.side] + ".png";
  ctx.drawImage(arrow, arrowIcon.x, 284, 30, 30);
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, 299);
  ctx.lineTo(arrowIcon.x, 299);
  
  ctx.moveTo(arrowIcon.x + 30, 299);
  ctx.lineTo(1200, 299);
  ctx.stroke();
}

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case "ArrowUp":
      audio.currentTime = 0;
      audio.play();
      break;
  }
});
