import { generateRestBack, moveLeft } from "./restBack.js";
import { generatePlates } from "./plates.js";
import {generateNote} from "./notepad.js";
import { drawDinoWaiter } from "./waiter.js";

var upDownKeys = new Image();
upDownKeys.src = "./assets/1_plane/keys.png";

var circleD = 0;
var startAnim = false;

export function startLevel(ctx, game, dino) {

  if (circleD < 60 && !startAnim) circleD += 0.5;
  if (circleD >= 0.5 && startAnim) circleD -= 0.5;
  if (circleD === 0 && startAnim) game.start = true;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(upDownKeys, 575, 143, 77 * 0.7, 171 * 0.7);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (game.keyDown && (game.keyDown.code === "ArrowUp" || game.keyDown.code === "ArrowDown")) startAnim = true;

  if (game.start) {
    dino.y = 300;
    generateRestBack(ctx, game);
    moveLeft();
    //generatePlates(ctx, game.frame, dino);
    //drawDinoWaiter(ctx, dino, game);
    //generateNote(ctx, game);
  }
}
