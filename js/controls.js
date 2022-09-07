export class Control {
  constructor(game) {
    this.keyDown;

    window.addEventListener('keydown', function (e) {

      e.preventDefault();
      game.keyDown = e;
      game.keyUp = " ";
      
    })
    window.addEventListener('keyup', function (e) {
      game.keyDown = " ";
      game.keyUp = e;
    });
    window.addEventListener('mousemove', function (e) {
      var position = getCursorPosition(canvas, e);
      if (position) game.mouseMovePosition = { x: position.x, y: position.y };
    });
    window.addEventListener('mousedown', function (e) {
      if (game.level === 4 || game.level === 7 || game.level === 10) {
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
  if (isInside) return { x: x, y: y };
}
