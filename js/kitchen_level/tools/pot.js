import {pot} from "../tools.js";
import { sinkIsOn } from "../sink.js";

var waterLevel = 0;
var tools = [];
var potInSink = false;

function drawPot(ctx) {
  pot.inPlace ? potInSink = true : potInSink = false;

  if (pot.inPlace && sinkIsOn) {
    ctx.fillStyle = "rgba(39, 200, 245, 0.27)";
    if (waterLevel < 72) waterLevel += 0.25;
    ctx.beginPath();
    ctx.arc(125, 130, waterLevel, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  if (waterLevel > 50 && waterLevel < 64 && selectedTool != undefined && selectedTool.name === "pot") {
    pot.shadow = { x: 1092, y: 170, r: 60 };
    pot.perfX = 1000;
    pot.perfY = 90;
  }

  if (pot.inPlace === false || pot.inPlace && sinkIsOn === false) {
    ctx.fillStyle = "rgba(39, 200, 245, 0.27)";
    ctx.beginPath();
    ctx.arc(pot.x + pot.width / 2, pot.y + pot.height / 2, waterLevel, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

export { drawPot, potInSink };
