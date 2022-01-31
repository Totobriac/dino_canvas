import {
  drawStove
} from "./tools/stove.js";

import {
  drawTools, 
  sink,
} from "./tools.js";
import {
  setControls,
} from "./control.js";
import {
  generateTable
} from "./tools/table.js";

import { drawSlice } from "./tools/slice.js";

function setTop(game, ctx) {

  ctx.globalCompositeOperation = 'source-over';

  setControls();

  generateTable(ctx);

  if (sink) sink.drawSink(ctx);

  drawStove(ctx);

  drawTools(ctx, game);

  drawSlice(ctx);

}
export {
  setTop
};
