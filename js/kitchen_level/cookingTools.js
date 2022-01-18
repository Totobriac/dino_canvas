import {
  burners,
  stoveSprite,
  getSelectedButton
} from "./stove.js";

import {
  sinkSprite,
  faucetOnSprite,
  faucetOffSprite,
  sinkIsOn,
  checkFaucet,
} from "./sink.js";

import {
  getCursorPosition,
} from "./function.js";

import {
  Tool
} from "./tools.js";

var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

var pot;
var selectedTool = null;
var selectedButton = null;
var tools = [];
var faucetSprite;
var waterLevel = 0;


function setTools(game, ctx) {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);

  ctx.drawImage(sinkSprite, 10, 10, 286, 243);

  if (sinkIsOn) waterLevel += 0.2;


  ctx.beginPath();
  ctx.moveTo(260, 102);
  ctx.arcTo(260, 233, 46, 233, 40);
  ctx.arcTo(46, 233, 46, 62, 40);
  ctx.arcTo(46, 62, 260, 62, 40);
  ctx.arcTo(260, 62, 263, 233, 40);

  ctx.fillStyle = "rgba(39, 200, 245, 0.37)";


  // ctx.arc(125, 130, waterLevel, 0, 2 * Math.PI, false);
  // ctx.fillStyle = "rgba(39, 200, 245, 0.37)";
  ctx.fill();



  sinkIsOn === false ? faucetSprite = faucetOffSprite : faucetSprite = faucetOnSprite;
  ctx.drawImage(faucetSprite, -15, -10, 173, 159);

  ctx.drawImage(stoveSprite, 750, 100, 425, 280);

  burners.forEach((burner, i) => {
    if (burner.isOn) ctx.drawImage(burner.sprite, burner.x, burner.y, burner.width, burner.height);
  });

  // if (game.kitchenLevelStarted === false) {
  //   pot = new Tool("pot", potSprite, 20, 20, 100, 100, ctx);
  //   tools.push(pot);
  //   game.kitchenLevelStarted = true;
  // }
  // pot.draw();
}

function onMouseDown(e) {
  checkFaucet(e);
  selectedButton = getSelectedButton(e);
  if (selectedButton != null) burners[selectedButton].isOn = !burners[selectedButton].isOn;

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

function getSelectedTool(e) {
  var mouse = getCursorPosition(e);
  for (let i = 0; i < tools.length; i++) {
    if (mouse.x < tools[i].x || mouse.x > tools[i].x + tools[i].width ||
      mouse.y < tools[i].y || mouse.y > tools[i].y + tools[i].height) {
      return null;
    } else {
      return tools[i];
    }
  }
}


export {
  setTools
};
