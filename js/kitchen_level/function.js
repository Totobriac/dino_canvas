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
    y: y,
    moveX: e.movementX,
    moveY: e.movementY,
  };
}

function getSelectedTool(e) {
  var mouse = getCursorPosition(e);
  for (let i = tools.length -1; i >= 0; i--) {
    if (mouse.x < tools[i].x || mouse.x > tools[i].x + tools[i].width ||
      mouse.y < tools[i].y || mouse.y > tools[i].y + tools[i].height) {
      tools[i].isSelected = false;
    } else {
      var tool = tools[i];
      tools.splice(i,1);
      tools.push(tool);
      tools[tools.length - 1].isSelected = true;
      return ;
    }
  }
  return;
}

export { getCursorPosition, getSelectedTool };
