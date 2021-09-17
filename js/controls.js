import { dinoFlyUp, dinoFlyDown } from "../js/plane_level/plane.js"
import { jump, isJumping } from "../js/desert_level/desert_dino.js"

export class Control {
  constructor(dino, game) {
    window.addEventListener('keydown', function (e) {
      if (e.code === "Space" && isJumping === false && game.level === 0) {
        jump();
        game.isPlaying = true;
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
        if (repeat === false) dinoFlyUp();
      }
    });
    window.addEventListener('keyup', function (e) {
      if (e.code === "ArrowUp") {
        dinoFlyDown();
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
    window.addEventListener('mousemove', function (e) {
      var position = getCursorPosition(canvas, e)
      game.mouseMovePosition = { x: position.x, y: position.y }
    });
    window.addEventListener('mousedown', function (e) {
      if (game.level === 4) {
        var position = getCursorPosition(canvas, e)
        game.mousePosition = { x: position.x, y: position.y }
      }
    });
  };
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x: x, y: y }
}
