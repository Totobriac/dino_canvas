import {
  getSelectedButton
} from "./tools/stove.js";
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
  sink,
  chefKnife,
  garlicPress
} from "./tools.js";


var selectedTool = null;

var points = [];

var mouse = {
  x: undefined,
  y: undefined,
  moveX: undefined,
  moveY: undefined,
  upX: undefined,
  upY: undefined,
};

function setControls() {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
  window.addEventListener('keydown', function (e) {
    switch (e.code) {
      case "ArrowUp":
        onion.spinOnion(0);
        break;
      case "ArrowRight":
        onion.spinOnion(90)
        break;
      case "ArrowDown":
        onion.spinOnion(180)
        break;
      case "ArrowLeft":
        onion.spinOnion(270)
        break;
    };
  })
}

function onMouseDown(e) {

  if(garlicPress.toCrush) garlicPress.addPoints();

  mouse = getCursorPosition(e); 

  sink.checkFaucet(e);
  getSelectedButton(e);
  sink.checkDrain(e);
  butterKnife.checkButter();
  butterKnife.checkCut();
  getSelectedTool(e);

  onion.donePeeling(mouse);

  if (onion.canSlice === true && onion.angle === 180 && onion.canMince === false) {
    onion.slices.push({
      x: chefKnife.x + chefKnife.width / 2,
      y: chefKnife.y,
      width: undefined,
    })
  }
  if (onion.angle === 90 && onion.canMince === true) {
    var x = chefKnife.x + chefKnife.width / 2;
    var startX = 678 - x;
    var oldWidth = onion.pieceWidth;
    if (180 + startX / 0.65 > onion.pieceWidth) {
      var newW = 180 + startX / 0.65 - oldWidth;
      onion.pieceWidth = 180 + startX / 0.65;
      onion.piecesWidth.push({w: newW, pW:onion.pieceWidth})
      onion.dif = 612 - mouse.x;
    }
    if (startX > 200 && onion.piecesWidth.length > 9) {
      onion.done();
    }
  }

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

  if (onion.inPlace === true && onion.state === "halfed" && e.offsetX > 400 && e.offsetX < 800) {
    points.push({
      x: e.offsetX,
      y: e.offsetY
    })
  }
}

function onMouseUp(e) {
  for (let i = 0; i < tools.length; i++) {
    tools[i].isSelected = false;
    tools[i].isMoving = false;
  }
  mouse.upX = e.offsetX;
  mouse.upY = e.offsetY;

}

export {
  setControls,
  selectedTool,
  points,
  mouse,
}
