import { player, pistol } from "../js/levels/9_dinoStein_level/raycasting.js";

export class Control {
  constructor(game) {
    this.keyDown;
    
    window.addEventListener('keydown', function (e) {
      game.keyDown = e;
      game.keyUp = " ";

      if (isFinite(e.key) && e.key != " ") {
        game.level = parseInt(e.key);        
      }

      switch (game.level) {
        case 9:
          switch (e.key) {
            case "ArrowUp":
              player.up();
              break;
            case "ArrowDown":
              player.down();
              break;
            case "ArrowRight":
              player.right();
              break;
            case "ArrowLeft":
              player.left();
              break;
            case " ":
              pistol.shoot();
              break;
          };
          break;
      }
    })
    window.addEventListener('keyup', function (e) {
      game.keyDown = " ";
      game.keyUp = e;
      switch (game.level) {
        case 9:
          switch (e.key) {
            case "ArrowUp":
              player.stopMoving();
              break;
            case "ArrowDown":
              player.stopMoving();
              break;
            case "ArrowRight":
              player.stopTurning();
              break;
            case "ArrowLeft":
              player.stopTurning();
              break;
          };
          break;
      }
    });
    window.addEventListener('mousemove', function (e) {
      var position = getCursorPosition(canvas, e);
      if (position) game.mouseMovePosition = { x: position.x, y: position.y };
    });
    window.addEventListener('mousedown', function (e) {
      if (game.level === 4 || game.level === 7) {
        var position = getCursorPosition(canvas, e);
        if (position) game.mousePosition = { x: position.x, y: position.y }
      }
    });
  }
}


function getCursorPosition(canvas, event) {
  var isInside;
  var xM = event.clientX;
  var yM = event.clientY;
  const rect = canvas.getBoundingClientRect();
  const x = xM - rect.left;
  const y = yM - rect.top;
  xM > rect.left && xM < rect.right && yM < rect.bottom && yM > rect.top ? isInside = true : isInside = false;
  if (isInside == true) return { x: x, y: y };
}
