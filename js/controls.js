import { walk } from "../js/levels/2_restaurant_level/waiter.js";
import { steer } from "../js/levels/6_race_level/road.js";
import { map, zelda } from "../js/levels/8_zeldouille_level/script.js";
import { player, pistol } from "../js/levels/9_dinoStein_level/raycasting.js";

export class Control {
  constructor(game) {
    this.keyDown;
    
    window.addEventListener('keydown', function (e) {
      game.keyDown = e;

      if (isFinite(e.key) && e.key != " ") {
        game.level = parseInt(e.key);        
      }
      
      switch (game.level) {
       
        case 2:
          if (e.code === "ArrowRight") {
            walk(1);
          };
          if (e.code === "ArrowLeft") {
            walk(-1);
          };
        case 6:
          if (e.repeat) return;
          if (e.key === 'ArrowLeft') {
            steer(0.008);
          };
          if (e.key === 'ArrowRight') {
            steer(-0.008);
          };
          break;
        case 8:
          if (map && !map.zobi) {
            zelda.isMoving = true;
            if (e.code === "ArrowDown") {
              zelda.direction = 0;
            }
            if (e.code === "ArrowUp") {
              zelda.direction = 1;
            }
            if (e.code === "ArrowRight") {
              zelda.direction = 2;
            }
            if (e.code === "ArrowLeft") {
              zelda.direction = 3;
            }
            if (e.code === "Space" && zelda.hasSword) {
              if (e.repeat) return;
              zelda.isAttacking = true;
            }
          };
          break;
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
      game.keyDown = "";
      game.keyUp = e;
      switch (game.level) {
    
        case 6:
          if (e.key === 'ArrowLeft') { steer(0) };
          if (e.key === 'ArrowRight') { steer(0) };
          break;
        case 8:
          zelda.isMoving = false;
          zelda.direction = undefined;
          break;
        case 9:
          switch (e.key) {
            case "ArrowUp":
              player.stopMoving();
              break;
            case "ArrowDown":
              player.stopMoving();
              break;
            case "ArrowRight":
              player.stopTuning();
              break;
            case "ArrowLeft":
              player.stopTuning();
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
