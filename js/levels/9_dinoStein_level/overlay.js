import { sound } from "./sound.js";

var psyched = new Image();
psyched.src = "./assets/9_dinoStein/psyched.png";

var dukeSound = new sound("./assets/9_dinoStein/sounds/duke.mp3");

var loadWidth = 0;
var loaded = false;
var doorTuto = false;
var fireTuto = false;



function drawOverlay(ctx, player) {

  loadWidth < 420 ? loadWidth += 2 : loaded = true;
  if (loadWidth === 320) dukeSound.play();  

  if ((player.xGrid === 29 || player.xGrid === 30) && player.yGrid === 37) {
    doorTuto = true;
  } else {
    doorTuto = false;
  }

  if ((player.xGrid === 22 || player.xGrid === 23) && player.yGrid === 38 ) {
    fireTuto = true;
  } else {
    fireTuto = false;
  }


  if (!loaded) {
    ctx.drawImage(psyched, 376, 175, 448,100);
    ctx.save();
    ctx.strokeStyle = "rgb(200,0,0)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo( 390, 265);
    ctx.lineTo( 390 + loadWidth , 265);
    ctx.stroke();
    ctx.restore();
  }

  if (doorTuto) {
    ctx.font = "50px Wolf";
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillText("Pressez 'Espace' pour ouvrir les portes. " , 350, 150);
  }

  if (fireTuto) {
    ctx.font = "50px Wolf";
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillText("Pressez 'F' pour tirer. " , 480, 150);
  }

}

export { drawOverlay };