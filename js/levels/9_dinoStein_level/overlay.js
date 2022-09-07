import { sound } from "./sound.js";
import { titleData } from "./startLevel9.js";
import { soundPlayer, bossKilled } from "./startLevel9.js";

var psyched = new Image();
psyched.src = "./assets/9_dinoStein/psyched.png";

var tempCanvas = document.createElement('canvas');
var tempCtx = tempCanvas.getContext('2d');
tempCanvas.width = 1200;
tempCanvas.height = 400;


var dukeSound = new sound("./assets/9_dinoStein/sounds/duke.mp3");

var loadWidth = 0;
var loaded = false;
var doorTuto = false;
var fireTuto = false;

var tickCount = 0;
var count = 0;

var drawTitle = true;


function drawOverlay(ctx, player, game) {

  tickCount++;

  if (!drawTitle) {
    loadWidth < 420 ? loadWidth += 2 : loaded = true;
  }

  if (loadWidth === 320) dukeSound.play();

  if ((player.xGrid === 29 || player.xGrid === 30) && player.yGrid === 37) {
    doorTuto = true;
  } else {
    doorTuto = false;
  }

  if ((player.xGrid === 22 || player.xGrid === 23) && player.yGrid === 38) {
    fireTuto = true;
  } else {
    fireTuto = false;
  }

  if (player.xGrid === 16 && player.yGrid === 18) {
    player.canMove = false;
    player.angle = 3 * Math.PI / 2;
    player.up();
  }

  if (player.xGrid === 16 && player.yGrid === 9) {
    soundPlayer.stopMain();
    game.switchLevel(10);
  }

  if (!loaded) {
    ctx.drawImage(psyched, 376, 175, 448, 100);
    ctx.save();
    ctx.strokeStyle = "rgb(200,0,0)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(390, 265);
    ctx.lineTo(390 + loadWidth, 265);
    ctx.stroke();
    ctx.restore();
  }

  if (doorTuto) {
    ctx.font = "50px Wolf";
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillText("Pressez 'Espace' pour ouvrir les portes. ", 350, 150);
  }

  if (fireTuto) {
    ctx.font = "50px Wolf";
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillText("Pressez 'F' pour tirer. ", 480, 150);
    ctx.fillText("Pressez la touche correspondante" , 400, 190);
    ctx.fillText("pour la selectionner. ", 480, 230);
  }

  if (drawTitle) {
    if (tickCount > 105) tileEffect(titleData.data);

    tempCtx.putImageData(titleData, 0, 0);

    ctx.drawImage(tempCanvas, 0, 0);
  }

  if (player.xGrid === 16 && player.yGrid === 20) {
    switch (bossKilled) {
      case 0:
        ctx.font = "50px Wolf";
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillText("Eliminez Bernacle en premier!", 450, 150);
        break;
      case 1:
        ctx.font = "50px Wolf";
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillText("Allez pour Fett Gesicht!. ", 480, 150);
        break;
      case 2:
        ctx.font = "50px Wolf";
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillText("Tuez l' Uber Zombi!. ", 480, 150);
        break;    
      default:
        break;
    }
  }
  if (player.xGrid === 18 && player.yGrid === 32) {
    switch (bossKilled) {
      case 0:
        ctx.font = "50px Wolf";
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillText("Eliminez Bernacle en premier!", 450, 150);
        break;
      case 1:
        ctx.font = "50px Wolf";
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillText("Allez pour Fett Gesicht!", 460, 150);
        break;   
      default:
        break;   
    }
  }
  if (player.xGrid === 20 && player.yGrid === 25) {
    switch (bossKilled) {
      case 0:
        ctx.font = "50px Wolf";
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillText("Eliminez Bernacle en premier!", 450, 150);
        break;     
      default:
        break;
    }
  }
}

function tileEffect(pixels) {

  if (count < 110000) {
    for (let i = 0; i < pixels.length; i += 1) {
      var rd = Math.floor(Math.random() * pixels.length * 12) * 4;

      if (pixels[rd] != 200) {
        pixels[rd] = 200;
        pixels[rd + 1] = 0;
        pixels[rd + 2] = 0;
        pixels[rd + 3] = 255;
      } else {
        pixels[rd + 3] = 0;
        count++;
      }
    }
  } else {
    drawTitle = false;
  }

}

export { drawOverlay };
