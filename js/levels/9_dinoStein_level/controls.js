export class Controls {
  constructor(player, map) {
    document.addEventListener('keydown', function(e) {
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
          if (!e.repeat) map.detectDoor();
          break;
        case "f":
          if (!e.repeat) player.shoot();
          break;
        case "0":
          player.chooseWeapon(0);
          break;
        case "1":
          player.chooseWeapon(1);
          break;
        case "2":
          player.chooseWeapon(2);
          break;
        case "3":
          player.chooseWeapon(3);
          break;
      }
    });
    document.addEventListener('keyup', function(e) {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
          player.stopMove();

          break;
        case "ArrowRight":
        case "ArrowLeft":
          player.stopTurn();
          break;
      }
    });
  }
}
