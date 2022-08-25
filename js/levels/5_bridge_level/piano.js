const keys = [["Bb4", 0, 2], ["G5", 8, 5], ["F5", 7, 2], ["G5", 8, 2], ["F5", 7, 5.6], ["Eb5", 5, 3.7], ["Bb4", 0, 2], ["G5", 8, 3.7], ["C5", 2, 1.9], ["C6", 11, 4],
["G5", 8, 1.9], ["Bb5", 10, 5.6], ["Ab5", 9, 3.8], ["G5", 8, 1.9], ["F5", 7, 5.8], ["G5", 8, 3.8], ["D5", 4, 1.9], ["Eb5", 5, 5.7], ["C5", 2, 5.7], ["Bb4", 0, 2],
["D6", 13, 2], ["C6", 11, 2], ["Bb5", 10, 1], ["Ab5", 9, 1], ["G5", 8, 1], ["Ab5", 9, 1], ["C5", 2, 1], ["D5", 4, 1], ["Eb5", 5, 5.7], ["silence", 99, 3.8],
["Bb4", 0, 2], ["G5", 8, 5.7], ["F5", 7, 1], ["G5", 8, 1], ["F5", 7, 1], ["E5", 6, 1], ["F5", 7, 1], ["G5", 8, 1], ["F5", 7, 2], ["Eb5", 5, 4.7],
["F5", 7, 1], ["Eb5", 5, 1], ["D5", 4, 1], ["Eb5", 5, 1], ["F5", 7, 1], ["G5", 8, 1], ["B4", 1, 1], ["C5", 2, 1], ["Db5", 3, 1], ["C5", 2, 1],
["F5", 7, 1], ["E5", 6, 1], ["Ab5", 9, 1], ["G5", 8, 1], ["Db6", 12, 1], ["C6", 11, 1], ["G5", 8, 1], ["Bb5", 10, 5.7], ["Ab5", 9, 3.8], ["F5", 7, 1.9],
["F5", 7, 5.7], ["G5", 8, 1.9], ["G5", 8, 1.9], ["D5", 4, 1.9], ["Eb5", 5, 5.7], ["C5", 2, 5.7], ["Bb4", 0, 2], ["D6", 13, 2], ["C6", 11, 2], ["Bb5", 10, 1],
["Ab5", 9, 1], ["G5", 8, 1], ["Ab5", 9, 0.5], ["Ab5", 9, 0.5], ["C5", 2, 1], ["D5", 4, 1], ["Eb5", 5, 7.1]];

var part = false;
var partition = [];
var oldFrame = 0;
var audio_file = "./assets/5_bridge/piano_mp3/B4.mp3";


var arrow = new Image();
arrow.src = "./assets/5_bridge/circle.png";

var arrowX = 600;

var arrowIcon = {
  x : 600,
}

let audio;

var hit = false;


class Key {
  constructor(name, index, length, ctx) {
    this.name = name;
    this.index = index;
    this.length = length;
    this.file = name + ".mp3";
    this.y;
    this.getTime();
    this.color;
    this.arrow = Math.floor(Math.random() * 3);
    this.ctx = ctx;
    this.resetHit = false;
  }
  getTime() {
    var sum = 0;
    for (let i = 0; i < partition.length; i++) {
      sum += keys[i][2];
    }
    this.y = -sum * 30 - this.length * 30;
  }
  drawTile() {
    this.updateTile();
    this.checkCollision();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(60 * this.index + 180, this.y, 30, this.length * 30);
  }
  updateTile() {
    this.y += 1.2;
  }
  checkCollision() {
    if (this.y + (this.length * 30) < 300 ) {
      this.color = "rgb(148, 224, 247)";
    }
    else if (this.y > 300) {
      this.color === "rgb(127, 220, 144)" ? this.color = "rgb(127, 220, 144)" : this.color = "rgb(228, 49, 50)";
    }
    else {
      if (!this.resetHit) {
        hit = false;
        this.resetHit = true;
      }
      hit? this.color = "rgb(127, 220, 144)" : this.color = "rgb(0, 170, 222)";
      audio_file = "./assets/5_bridge/piano_mp3/" + this.file;
      audio = new Audio(audio_file);
      arrowIcon.x = 60 * this.index + 180;
    }
  }
}

export function generatePiano(ctx, frame) {
  if (!part) {
    for (let i = 0; i < keys.length; i++) {
      partition.push(new Key(keys[i][0], keys[i][1], keys[i][2], ctx))
    }
    oldFrame = frame;
    part = true;
  }
  if (frame > oldFrame + 900) {
    for (let i = 0; i < partition.length; i++) {
      if (partition[i].y > 400) {
        partition.splice(i,1);
        i--;
      } else {
        partition[i].drawTile();
      }
    }
    drawLine(ctx);
  }
}

function drawLine(ctx) {

  if (arrowX < arrowIcon.x ) {
    arrowX += (arrowIcon.x - arrowX) / 2;
  } else if (arrowX > arrowIcon.x) {
    arrowX -= (arrowX - arrowIcon.x) / 2;
  }
  ctx.drawImage(arrow, arrowX , 284, 30, 30);
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, 299);
  ctx.lineTo(arrowIcon.x, 299);

  ctx.moveTo(arrowIcon.x + 30, 299);
  ctx.lineTo(1200, 299);
  ctx.stroke();
}

document.addEventListener('keydown', function(event) {
  if (event.repeat) return
  switch (event.key) {
    case "ArrowUp":
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      };
      hit = true;
      break;
  }
});
