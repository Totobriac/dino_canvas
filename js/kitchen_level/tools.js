
import { Sink } from "./tools/sink.js";
import { generateTools } from "./toolGeneration.js";

var sink;
var tools = [];
var stepDone = 7;


function drawTools(ctx, game) {
  if (game.kitchenLevelStarted === false) {

    sink = new Sink();

    tools = generateTools(ctx);

    game.kitchenLevelStarted = true;

  }
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].isDesplayed === true) {
      tools[i].draw();
      tools[i].isClose();
    }
  }
  selectable();
  sink.drawFaucet(ctx);
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
  addStep,
  stepDone,
};
