
import { Sink } from "./tools/sink.js";
import { generateTools, notepad } from "./toolGeneration.js";

var sink;
var tools = [];
var stepDone = 0;

function load(ctx, game) {
  if (!game.loadedLevel[3]) {
    return new Promise ((resolve) => {
      sink = new Sink();
      tools = generateTools(ctx);
      game.loadedLevel[3] = true;
      resolve();
    })       
  }
}


async function drawTools(ctx, game) {
  await  load(ctx, game);
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].isDesplayed === true) {
      tools[i].draw();
      tools[i].isClose();
    }
  }
  selectable();
  if (sink) sink.drawFaucet(ctx);
}

function displayTool(toolL) {
  for (let i = 0; i < tools.length; i++) {
    if (toolL.includes(tools[i].name)) {
      tools[i].isDesplayed = true;
    } else {
      tools[i].isDesplayed = false;
    }
  }
}

function displayAllTools() {
  for (let i = 0; i < tools.length; i++) {
    tools[i].isDesplayed = true;
  }
}

function deleteTool(tool) {
  var newTools = tools.filter(t => t.name != tool);
  tools = newTools;
}

function onTop(tool) {
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].name === tool) {
      var tool = tools[i];
      tools.splice(i, 1);
      tools.push(tool);
    }
  }
}

function onTopTwo(tool) {
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].name === tool) {
      var tool = tools[i];
      tools.splice(i, 1);
      tools.splice( tools.length - 1, 0, tool);
    }
  }
}

function deselect(e) {
  for (let i = 0; i < tools.length; i++) {
    tools[i].isSelected = false;
    tools[i].isMoving = false;
  }
}

function selectable() {
  var objects;
  switch(stepDone){
    case 0 :
      objects = ["pot"];
    break;
    case 1:
    case 2:
      objects = ["pot"];
    break;
    case 3:
      objects = ["salt"];
    break;
    case 4:
      objects = ["butterKnife"];
    break;
    case 5:
      objects = [];
    break;
    case 6:
      objects = ["pan"];
    break;
    case 7:
      objects = ["onion", "chefKnife"];
    break;
    case 8:
      objects = ["garlic", "garlicPress"];
    break;
    case 9:
      objects = ["carrot", "grater"];
    break;
    case 10:
      objects = ["spoon"];
    break;
    case 11:
      objects = ["spoon", "meat"];
    break;
    case 12:
      objects = ["pasta"];
    break;
    case 13:
      objects = ["spoon"];
    break;
    case 14:
      objects = ["tin","tinOpener"];
    break;
    case 15:
      objects = ["tin"];
    break;
    case 16 :
      objects = ["pot", "colander"];
    break;
    case 17 :
      objects = ["colander"];
    break;
  }

  var selectableTools = ["notepad", ...objects ];
  for (const tool of tools) {
    if (selectableTools.includes(tool.name)) {
      tool.canBeSelected = true;
    }
    else{
      tool.canBeSelected = false;
    }
  }
}

function calculateOffset(e) {
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].isSelected === true) {
      tools[i].offset = {
        x: e.offsetX - tools[i].x,
        y: e.offsetY - tools[i].y
      }
      tools[i].isMoving = true;
    }
  }
}

function move(e) {
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].isSelected === true) {
      tools[i].x = e.offsetX - tools[i].offset.x;
      tools[i].y = e.offsetY - tools[i].offset.y;
      tools[i].isMoving = true;
    }
  }
}

function addStep(step) {
  if (step > stepDone ) stepDone = step;
}

export {
  drawTools,
  tools,
  sink,
  deleteTool,
  displayTool,
  displayAllTools,
  onTop,
  onTopTwo,
  addStep,
  stepDone,
  deselect,
  calculateOffset,
  move
};
