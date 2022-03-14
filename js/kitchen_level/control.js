import { getSelectedButton } from "./tools/stove.js";
import { getCursorPosition, getSelectedTool } from "./function.js";
import { butterKnife, onion, chefKnife, garlicPress, meat, notepad } from "./toolGeneration.js";
import { tools, sink, deselect, calculateOffset } from "./tools.js";


var selectedTool = null;
var points = [];
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

  garlicPress.points();
  meat.selectedPiece(e);

  butterKnife.checkButter();
  butterKnife.checkCut();
  onion.sliceIt();
}

function onMouseMove(e) {

  mouse = getCursorPosition(e);

  for (let i = 0; i < tools.length; i++) {
    if (tools[i].isSelected === true) {
      tools[i].x = mouse.x - tools[i].offset.x;
      tools[i].y = mouse.y - tools[i].offset.y;
      tools[i].isMoving = true;
    }
  }

  if (onion.inPlace === true && onion.state === "halfed" && e.offsetX > 400 && e.offsetX < 800) {
    points.push({
      x: e.offsetX,
      y: e.offsetY
    })
  }
}

function onMouseUp(e) {
  deselect(e);
  mouse.upX = e.offsetX;
  mouse.upY = e.offsetY;
}

export { setControls, selectedTool, points, mouse, key };
