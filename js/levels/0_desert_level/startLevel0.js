import { createCactus } from "./cactus.js";
import { drawBack } from "./desertBack.js";
import { drawDinoDesert } from "./desert_dino.js";

var dinoSprite = new Image();
dinoSprite.src = "../assets/dino/dino_run.png";

var dinoAnim = {
  x: 310,
  y: 20
}

var textOffset = 0;
var startAnim = false;
var goRight = false;
var angle = 0;
var dinoFalls = false;


export function startLevel(ctx, game, dino) {
  drawBack(ctx, game, dino);
  createCactus(game, dino, ctx);
  drawDinoDesert(ctx, dino, game);

  if (game.keyDown && game.keyDown.code === "Space") startAnim = true;

  if (!game.start) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(dinoSprite, 0, 0, 88, 94, dinoAnim.x, dinoAnim.y, 66, 70);
    ctx.fillStyle = "black";

    ctx.save();

    ctx.translate(310, 160);

    ctx.rotate(- angle * Math.PI / 180);

    ctx.font = "500 30px Roboto";
    ctx.fillText("Aucun accès à Internet", 0, 0);

    ctx.restore();

    ctx.font = "300 20px Roboto";
    ctx.fillText("Voici quelques conseils:", 310 + textOffset, 220);

    ctx.fillText(". Vérifiez les câbles réseau, le modem et le routeur.", 330 - textOffset, 250);
    ctx.fillText(". Reconnectez-vous au réseau Wi-Fi", 330 + textOffset, 280);

    ctx.fillStyle = "blue";
    ctx.fillText(". Appuyez sur la touche 'Espace'", 330 - textOffset, 310);

    ctx.fillStyle = "black";
    ctx.font = "300 15px Roboto";
    ctx.fillText("ERR_INTERNET_DISCONNECTED", 310 + textOffset, 355);

    if (startAnim) anim(game)
  }
}

function anim(game) {
  !goRight ? (textOffset > - 30 ? textOffset -= 1 : goRight = true) : textOffset += 7;
  if (dinoAnim.y < 76) dinoAnim.y += 3;
  if (textOffset > 800) {
    while (angle < 20) angle += 0.03;
  }
  if  (angle > 20) { dinoFalls = true }
  if (dinoFalls) {
    if (dinoAnim.x > 130) dinoAnim.x -= 5;
    dinoAnim.y < 300 ? dinoAnim.y += 6 : dinoAnim.y = 300;
  }
  if (dinoAnim.y === 300) game.start = true;

}
