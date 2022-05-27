import { pointNClick } from "./gameMecanic.js";


export function startLevel(ctx, game) {

  var canvasDiv = document.getElementById("canvas");
  canvasDiv.setAttribute("style", "cursor: url('../assets/7_mansion/pointer.png'), auto");

  pointNClick(ctx, game);
}
