export class Game {
  constructor() {
    this.keyDown = null;
    this.keyUp = null;
    this.mousePosition = { x: 600, y: 200 };
    this.mouseMovePosition = { x: 600, y: 200 };
    this.frame = 0;
    this.score = 0;
    this.gamespeed = 5;
    this.level = 10;
    this.loadedLevel = new Array(11).fill(false);
    this.start = false;
    this.levelDone = false;
  }
  switchLevel(lvl) {

    this.start = false;
    this.level = lvl;
    this.levelDone = false;
    this.score = 0;
  }
}
