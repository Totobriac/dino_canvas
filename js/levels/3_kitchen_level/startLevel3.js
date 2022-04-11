import { drawStove } from "./tools/stove.js";
import { drawTools, sink } from "./tools.js";
import { setControls } from "./control.js";
import { generateTable } from "./tools/table.js";
import { top } from "../../script.js";

var canvasStyle = document.body.style;
canvasStyle.setProperty('--canvas-height', '400px');
canvasStyle.setProperty('--canvas-width', '1200px');
canvasStyle.setProperty('--canvas-top', '0px');
canvasStyle.setProperty('--canvas-top', top + 'px');

canvas.height = 400;
canvas.width = 1200;

export function startLevel(game, ctx) {
  ctx.globalCompositeOperation = 'source-over';
  setControls();
  generateTable(ctx);
  if (sink) sink.drawSink(ctx);
  drawStove(ctx);
  drawTools(ctx, game);
}
