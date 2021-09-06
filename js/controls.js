export class Control {
  constructor(dino, game) {
    window.addEventListener('keydown', function (e) {
      if (e.code === "Space" && dino.y == 301 && game.level === 0) {
        dino.jump();
        game.isPlaying = true;
        dino.isJumping = true;
        setTimeout(() => dino.isJumping = false, 820)
      }
      else if (e.code === "KeyB") {
        game.bino = true;
      }
    });
    window.addEventListener('keyup', function (e) {
      if (e.code === "KeyB") {
        game.bino = false;
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.code === "ArrowUp") {
        var repeat = e.repeat;
        if (repeat === false) dino.dinoFlyUp();
      }
    });
    window.addEventListener('keyup', function (e) {
      if (e.code === "ArrowUp") {
        dino.dinoFlyDown();
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.code === "ArrowRight") {
        dino.walkRight();
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.code === "ArrowLeft") {
        dino.walkLeft();
      }
    });
  };
}