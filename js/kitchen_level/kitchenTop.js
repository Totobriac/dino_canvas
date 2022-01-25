import {
  drawStove
} from "./tools/stove.js";
import {
  drawSink
} from "./tools/sink.js";
import {
  drawTools
} from "./tools.js";
import {
  setControls,
  points
} from "./control.js";
import {
  generateTable
} from "./tools/table.js";

function setTop(game, ctx) {

  ctx.globalCompositeOperation = 'source-over';

  setControls();

  generateTable(ctx);

  drawSink(ctx);

  drawStove(ctx);

  drawTools(ctx, game);

  peelOnion(ctx);

}


export {
  setTop
};


function peelOnion(ctx) {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = "rgba(0,0,0,1)"
  for (let i = 0; i < points.length; i ++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, 30, 0, 2 * Math.PI);
    ctx.fill();
  }
}
