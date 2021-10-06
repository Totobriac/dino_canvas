import { dinoFlyUp, dinoFlyDown } from "../js/plane_level/plane.js";
import { jump, isJumping } from "../js/desert_level/desert_dino.js";
import { walk } from "../js/restaurant_level/waiter.js";
import { steer } from "../js/race_level/road.js";

export class Control {
  constructor(dino, game) {
    window.addEventListener('keydown', function (e) {
      if (e.code === "Space" && isJumping === false && game.level === 0) {
        jump();
        game.isPlaying = true;
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
        walk(1);
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.code === "ArrowLeft") {
        walk(-1);
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
    window.addEventListener('keydown', function (e) {
      if (game.level === 7) {
        if (e.repeat) return;
        var name = e.key;
        if (name === 'ArrowLeft') {
          steer(0.008);
        }
        if (name === 'ArrowRight') {
          steer(-0.008);
        }
      }
    });
    window.addEventListener('keyup', function (e) {
      if (game.level === 7) {
        var name = e.key;
        if (name === 'ArrowLeft') {
          steer(0);
        }
        if (name === 'ArrowRight') {
          steer(0);
        }
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
