import { getSelectedButton } from "./tools/stove.js";
import { getCursorPosition, getSelectedTool } from "./function.js";
import { butterKnife, onion, chefKnife, garlicPress, meat, notepad } from "./toolGeneration.js";
import { tools, sink, deselect, calculateOffset, stepDone } from "./tools.js";


var selectedTool = null;
var key = "";
var mouse = {
  x: undefined,
  y: undefined,
  moveX: undefined,
  moveY: undefined,
  upX: undefined,
  upY: undefined,
  downX: undefined,
  downY: undefined,
};

function setControls() {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
  window.addEventListener('keydown', function (e) {
    key = e.code;
  })
}

function onMouseDown(e) {
  mouse.downX = e.offsetX;
  mouse.downY = e.offsetY;
  getSelectedTool(e);
  calculateOffset(e);
  notepad.reset(e);
  sink.checkFaucet(e);
  sink.checkDrain(e);
  getSelectedButton(e);
  switch (stepDone) {
    case 4 :
      butterKnife.checkButter();
      butterKnife.checkCut();
    break;
    case 7 :
      onion.sliceIt();
    break;
    case 8 :
      garlicPress.points();
    break;
    case 11 :
      meat.selectedPiece(e);
    break;
  }
}

function onMouseMove(e) {
  mouse = getCursorPosition(e);
  if (stepDone === 7) {
    onion.addPoints(e);
  }

  for (let i = 0; i < tools.length; i++) {
    if (tools[i].isSelected === true) {
      tools[i].x = e.offsetX - tools[i].offset.x;
      tools[i].y = e.offsetY - tools[i].offset.y;
      tools[i].isMoving = true;
    }
  }

}

function onMouseUp(e) {
  deselect(e);
  mouse.upX = e.offsetX;
  mouse.upY = e.offsetY;
}

export { setControls, selectedTool, mouse, key };
