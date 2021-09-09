export class Game {
  constructor() {
    this.frame = 0;
    this.score = 0;
    this.gamespeed = 4;
    this.isPlaying = false;
    this.bino = false;
    this.level = 3;
    this.mousePosition = { x: 0, y: 0 };
  }
}