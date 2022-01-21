import {tools} from "./tools.js";

function getCursorPosition(e) {
  var isInside;
  var xM = e.clientX;
  var yM = e.clientY;
  const rect = canvas.getBoundingClientRect();
  const x = xM - rect.left;
  const y = yM - rect.top;
  xM > rect.left && xM < rect.right && yM < rect.bottom && yM > rect.top ? isInside = true : isInside = false;
  if (isInside == true) return {
    x: x,
    y: y
  };
}

function getSelectedTool(e) {
  var mouse = getCursorPosition(e);
  var selection;
  for (let i = 0; i < tools.length; i++) {
    if (mouse.x < tools[i].x || mouse.x > tools[i].x + tools[i].width ||
      mouse.y < tools[i].y || mouse.y > tools[i].y + tools[i].height) {
      selection = null;
    } else {
      return tools[i];
    }
  }
  return selection;
}

export { getCursorPosition, getSelectedTool };
