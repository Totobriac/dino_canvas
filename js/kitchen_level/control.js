import {
  getSelectedButton
} from "./tools/stove.js";
import {
  checkDrain,
  checkFaucet
} from "./tools/sink.js";
import {
  getCursorPosition,
} from "./function.js";
import {
  getSelectedTool
} from "./function.js";
import {
  butterKnife,
  onion,
} from "./tools.js";


var selectedTool = null;

var points = [];


function setControls() {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {
  var mouse = getCursorPosition(e);
  checkFaucet(e);
  getSelectedButton(e);
  checkDrain(e);
  butterKnife.checkButter();
  butterKnife.checkCut();
  selectedTool = getSelectedTool(e);

  onion.donePeeling(mouse);

  if (selectedTool) {
    var mouse = getCursorPosition(e);
    selectedTool.offset = {
      x: mouse.x - selectedTool.x,
      y: mouse.y - selectedTool.y
    }
    selectedTool.isMoving = true;
  }
}

function onMouseMove(e) {
  var mouse = getCursorPosition(e);

  if (selectedTool) {
    selectedTool.x = mouse.x - selectedTool.offset.x;
    selectedTool.y = mouse.y - selectedTool.offset.y;
    selectedTool.isMoving = true;
  }
  if (onion.inPlace === true && e.offsetX > 400 && e.offsetX < 800) {
    points.push({
      x: e.offsetX,
      y: e.offsetY
    })
  }
}

function onMouseUp(e) {
  if (selectedTool) selectedTool.isMoving = false;
  selectedTool = null;
}



export {
  setControls,
  selectedTool,
  points
}
