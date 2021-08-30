export class Control {
  constructor(dino, game) {
    window.addEventListener('keydown', function (e) {
      if (e.code === "Space" && dino.y == 301) {
        dino.jump();
        game.isPlaying = true;
        dino.isJumping = true;
        setTimeout(() => dino.isJumping = false, 820)
      }
      else if (e.code === "KeyB") {
        game.bino = true;
      }
    })
    window.addEventListener('keyup', function (e) {
      if (e.code === "KeyB") {
        game.bino = false;
      }
    })
  };
}