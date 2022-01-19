import { drawStove } from "./stove.js";
import { drawFaucet, drawSink } from "./sink.js";
import { drawTools } from "./tools.js";
import { setControls } from "./control.js";


function setTop(game, ctx) {

  setControls();

  drawSink(ctx);

  drawStove(ctx);

  drawTools(ctx,game);

  drawFaucet(ctx);
  
}


export { setTop };