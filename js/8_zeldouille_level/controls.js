export class Control {
  constructor(zelda, map) {
    window.addEventListener('keydown', function (e) {

      if (map.zobi === false) {
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
      }
    });

    window.addEventListener('keyup', function (e) {
      zelda.isMoving = false;
      zelda.direction = undefined;
    });
  }
}
