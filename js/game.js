export class Game {
  constructor() {
    this.keyDown = null;
    this.keyUp = null;
    this.mousePosition = { x: 600, y: 200 };
    this.mouseMovePosition = { x: 600, y: 200 };
    this.frame = 0;
    this.score = 0;
    this.gamespeed = 5;
    this.level = 0;
    this.loadedLevel = new Array(10).fill(false);
    this.start = false;
  }
}
