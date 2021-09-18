function setUpControls(player) {
  document.addEventListener('keydown', function (event) {
    switch (event.key) {
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
    }
  });
  document.addEventListener('keyup', function (event) {
    switch (event.key) {
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
    }
  });
}

export { setUpControls }