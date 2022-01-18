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

var angle = 0;
var level = 0;


function setTools(game, ctx) {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);

  ctx.drawImage(sinkSprite, 10, 10, 286, 243);

  if (sinkIsOn) waterLevel += 0.25;



  ctx.fillStyle = "rgba(39, 200, 245, 0.37)";

  if (waterLevel < 69) {
    ctx.arc(125, 130, waterLevel, 0, 2 * Math.PI, false);
    ctx.fill();
  } else if (waterLevel >= 69 && angle <= 30) {
    angle += 0.3;
    ctx.beginPath();
    ctx.moveTo(194 + (angle * 2.2), 129 + (angle * -0.9));
    ctx.arcTo(194 + (angle * 2.2), 199 + (angle * 1.13), 56 + (angle * -0.33), 199 + (angle * 1.13), 70 + -angle);
    ctx.arcTo(56 + (angle * -0.33), 199 + (angle * 1.113), 56 + (angle * -0.33), 61, 70 + -angle);
    ctx.arcTo(56 + (angle * -0.33), 61, 194 + (angle * 2.2), 61, 70 + -angle);
    ctx.arcTo(194 + (angle * 2.2), 61, 194 + (angle * 2.45), 199 + (angle * 1.13), 70 + -angle);
    ctx.fill();

    console.log(waterLevel)


  } else if (waterLevel >= 94  && level <= 10) {
    level += 0.3;
    ctx.beginPath();
    ctx.moveTo(260 + (level * 1.5), 102 + (level * 3.3));
    ctx.arcTo(260 + (level * 1.5), 233, 46 + (level * -1.6), 233, 40);
    ctx.arcTo(46  + (level * -1.6), 233, 46 + (level * -1.6), 62, 40);
    ctx.arcTo(46 + (level * -1.6), 62  + (level * -2.7), 260 + (level * 1.5), 62  + (level * -2.7), 40);
    ctx.arcTo(260 + (level * 1.5), 62  + (level * -2.7), 263  + (level * 1.2), 233, 40);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(275, 135);
    ctx.arcTo(275, 234, 30, 234, 40);
    ctx.arcTo(30, 234, 30, 35, 40);
    ctx.arcTo(30, 35, 275, 35, 40);
    ctx.arcTo(275, 35, 275, 230, 40);
    ctx.fill();
  }



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
