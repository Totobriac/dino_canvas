export class Game {
  constructor() {
    this.frame = 0;
    this.score = 0;
    this.gamespeed = 4;
    this.isPlaying = false;
    this.bino = false;
    this.level = 4;
    this.mousePosition = { x: 600, y: 200 };
  }
}