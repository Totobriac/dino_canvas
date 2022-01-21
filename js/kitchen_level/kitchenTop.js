import { drawStove } from "./tools/stove.js";
import { drawFaucet, drawSink } from "./tools/sink.js";
import { drawTools } from "./tools.js";
import { setControls } from "./control.js";
import { generateTable} from "./tools/table.js";

function setTop(game, ctx) {

  setControls();

  generateTable(ctx);

  drawSink(ctx);

  drawStove(ctx);

  drawTools(ctx,game);

  drawFaucet(ctx);

}


export { setTop };
