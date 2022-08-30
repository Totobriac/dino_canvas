import { createCactus } from "./cactus.js";
import { drawBack } from "./desertBack.js";
import { drawDinoDesert } from "./desert_dino.js";
import { sound } from "../../sound.js";

var dinoSprite = new Image();
dinoSprite.src = "./assets/dino/dino_run.png";

var startAnim = false;
var alpha = 1;
var circleD = 900;
var endVolume = 1;

var music = new sound("./assets/0_desert/lusty.mp3");

export function startLevel(ctx, game, dino) {


  drawBack(ctx, game, dino);
  createCactus(game, dino, ctx);
  drawDinoDesert(ctx, dino, game);
  music.volume(1);
  ctx.restore();


  if (game.keyDown && game.keyDown.code === "Space") startAnim = true;

  if (!game.start && !game.levelDone) {

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dinoSprite, 0, 0, 88, 94, dino.x, dino.y, 66, 70);
    ctx.fillStyle = "black";

    ctx.save();

    ctx.globalAlpha = alpha;
    ctx.font = "500 35px Roboto";
    ctx.fillText("Aucun accès à Internet", 130, 160);

    ctx.font = "500 20px Roboto ";
    ctx.fillText("Voici quelques conseils:", 130, 220);
    ctx.fillText(". Vérifiez les câbles réseau, le modem et le routeur.", 150, 250);
    ctx.fillText(". Reconnectez-vous au réseau Wi-Fi", 150, 280);

    ctx.fillStyle = "blue";
    ctx.fillText(". Appuyez sur la touche 'Espace'", 150, 310);

    ctx.fillStyle = "grey";
    ctx.font = "300 15px Roboto";
    ctx.fillText("ERR_INTERNET_DISCONNECTED", 130, 355);

    ctx.restore();

    if (startAnim) anim(game, dino)
  }


  if (game.levelDone) {
    game.start = false;
    endVolume > 0.007 ? endVolume -= 0.007 : music.stop();
    music.volume(endVolume)
    circleD >= 6 ? circleD -= 6 : game.switchLevel(1);
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(dino.x + 33, dino.y + 35, circleD, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}


function anim(game, dino) {
  dino.y < 300 ? dino.y += 6 : dino.y = 300;
  alpha > 0.08 ? Math.floor(alpha -= 0.08) : alpha = 0;
  if (dino.y === 300) {
    game.start = true;
    music.play();
  }
}

//Brush Strokes by texasradiofish (c) copyright 2022 Licensed under a Creative Commons Attribution Noncommercial  (3.0) license. http://dig.ccmixter.org/files/texasradiofish/64682 Ft: billraydrums
