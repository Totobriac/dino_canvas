import { drawStove } from "./tools/stove.js";
import { drawTools, sink } from "./tools.js";
import { setControls } from "./control.js";
import { generateTable } from "./tools/table.js";
import { drawSlice } from "./tools/slice.js";
import { drawBottomPress } from "./tools/bottom_press.js";

export function startLevel3(game, ctx) {

  ctx.globalCompositeOperation = 'source-over';

  setControls();

  generateTable(ctx);

  if (sink) sink.drawSink(ctx);

  drawStove(ctx);

  drawTools(ctx, game);

  drawSlice(ctx);

  drawBottomPress(ctx);
}
