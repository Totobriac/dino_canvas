const keys = [["Bb4", 0, 2], ["G5", 8, 5], ["F5", 7, 2], ["G5", 8, 2], ["F5", 7, 5.6], ["Eb5", 5, 3.7], ["Bb4", 0, 2], ["G5", 8, 3.7], ["C5", 2, 1.9], ["C6", 11, 4],
["G5", 8, 1.9], ["Bb5", 10, 5.6], ["Ab5", 9, 3.8], ["G5", 8, 1.9], ["F5", 7, 5.8], ["G5", 8, 3.8], ["D5", 4, 1.9], ["Eb5", 5, 5.7], ["C5", 2, 5.7], ["Bb4", 0, 2],
["D6", 13, 2], ["C6", 11, 2], ["Bb5", 10, 1], ["Ab5", 9, 1], ["G5", 8, 1], ["Ab5", 9, 1], ["C5", 2, 1], ["D5", 4, 1], ["Eb5", 5, 5.7], ["silence", 99, 3.8],
["Bb4", 0, 2], ["G5", 8, 5.7], ["F5", 7, 1], ["G5", 8, 1], ["F5", 7, 1], ["E5", 6, 1], ["F5", 7, 1], ["G5", 8, 1], ["F5", 7, 2], ["Eb5", 5, 4.7],
["F5", 7, 1], ["Eb5", 5, 1], ["D5", 4, 1], ["Eb5", 5, 1], ["F5", 7, 1], ["G5", 8, 1], ["B4", 1, 1], ["C5", 2, 1], ["Db5", 3, 1], ["C5", 2, 1],
["F5", 7, 1], ["E5", 6, 1], ["Ab5", 9, 1], ["G5", 8, 1], ["Db6", 12, 1], ["C6", 11, 1], ["G5", 8, 1], ["Bb5", 10, 5.7], ["Ab5", 9, 3.8], ["F5", 7, 1.9],
["F5", 7, 5.7], ["G5", 8, 1.9], ["G5", 8, 1.9], ["D5", 4, 1.9], ["Eb5", 5, 5.7], ["C5", 2, 5.7], ["Bb4", 0, 2], ["D6", 13, 2], ["C6", 11, 2], ["Bb5", 10, 1],
["Ab5", 9, 1], ["G5", 8, 1], ["Ab5", 9, 0.5], ["Ab5", 9, 0.5], ["C5", 2, 1], ["D5", 4, 1], ["Eb5", 5, 7.1], ["D5", 4, 2], ["Eb5", 5, 1.9]];

var partition = [];
var oldFrame = 0;

class Key {
  constructor(name, index, length) {
    this.name = name;
    this.index = index;
    this.length = length;
    this.file = name + ".mp3";
    this.y;
    this.getTime();
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
    ctx.fillRect(60 * this.index + 180, this.y, 30, this.length * 30);
  }
  updateTile() {
    this.y += 1.2;
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
      partition[i].drawTile(ctx);
    }
  }
}