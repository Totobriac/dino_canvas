import { getSelectedButton } from "./stove.js";
import { checkDrain, checkFaucet } from "./sink.js";
import { getCursorPosition, } from "./function.js";
import { getSelectedTool } from "./tools.js";

var selectedTool = null;

function setControls() {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {
  checkFaucet(e);
  getSelectedButton(e);
  checkDrain(e);
  selectedTool = getSelectedTool(e);

  if (selectedTool) {
    var mouse = getCursorPosition(e);
    selectedTool.offset = {
      x: mouse.x - selectedTool.x,
      y: mouse.y - selectedTool.y
    }
  }
}

function onMouseMove(e) {
  if (selectedTool) {
    var mouse = getCursorPosition(e);
    selectedTool.x = mouse.x - selectedTool.offset.x;
    selectedTool.y = mouse.y - selectedTool.offset.y;
  }
}

function onMouseUp(e) {
  selectedTool = null;
}



export {setControls, selectedTool}