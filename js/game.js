export class Game {
  constructor() {
    this.frame = 0;
    this.score = 0;
    this.gamespeed = 0;
    this.isPlaying = false;
    this.level = 1;
    this.level === 8 ? this.mousePosition = { x: 881, y: 300 } : this.mousePosition = { x: 600, y: 200 };
    this.mouseMovePosition = { x: 600, y: 200 };
    this.level1Started = false;
    this.level2Started = false;
    this.level4Started = false;
    this.level5Started = false;
    this.level6Started = false;
    this.level7Started = false;
    this.level8Started = false;
    this.level8Dino = false;
  }
}
