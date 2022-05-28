import { pointNClick } from "./gameMecanic.js";

var ctx;

export function startLevel(ctx, game) {

  ctx = ctx;

  var canvasDiv = document.getElementById("canvas");
  canvasDiv.setAttribute("style", "cursor: url('../assets/7_mansion/pointer.png'), auto");

  pointNClick(ctx, game);
}

export { ctx };
