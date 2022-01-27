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
  tools,
  chefKnife,
} from "./tools.js";


var selectedTool = null;

var points = [];

var mouse;

function setControls() {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {

  mouse = getCursorPosition(e);

  checkFaucet(e);
  getSelectedButton(e);
  checkDrain(e);
  butterKnife.checkButter();
  butterKnife.checkCut();
  getSelectedTool(e);

  onion.donePeeling(mouse);  

  for (let i = 0; i < tools.length; i++) {
    if (tools[i].isSelected === true) {
      tools[i].offset = {
        x: mouse.x - tools[i].x,
        y: mouse.y - tools[i].y
      }
      tools[i].isMoving = true;
    }
  }
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

  if (onion.inPlace === true && onion.state === "to peel" && e.offsetX > 400 && e.offsetX < 800) {
    points.push({
      x: e.offsetX,
      y: e.offsetY
    })
  }

  chefKnife.halfOnion();
}

function onMouseUp(e) {
  for (let i = 0; i < tools.length; i++) {
    tools[i].isSelected = false;
    tools[i].isMoving = false;
  }
  if(onion.state === "cut half") chefKnife.splitOnion();
}

export {
  setControls,
  selectedTool,
  points,
  mouse,
}
