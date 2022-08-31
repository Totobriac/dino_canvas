import { endBooting } from "./startLevel9.js";
import { sound } from "./sound.js";

var compSound = new sound("./assets/9_dinoStein/sounds/compuSound.mp3");
var typingSound = new sound("./assets/9_dinoStein/sounds/typing.mp3");

var date = new Date();
var strDate = date.toString();
var dateNoGMT = strDate.split('G');

var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();

var animTC = 0;

var textAnim = [
  "d", "di", "din", "dino", "dinos", "dinost",
  "dinoste", "dinostei", "dinostein",
  "dinostein.", "dinostein.e", "dinostein.ex",
  "dinostein.exe"
];

var textAnimI = 0;


function drawBoot(ctx) {

  compSound.play();

  animTC++;

  ctx.save();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1200, 400);

  ctx.font = "16px Dos";
  ctx.fillStyle = "rgb(255, 255 ,255)";

  switch (true) {
    case animTC > 157 && animTC < 328:
      if (animTC % 10 === 0) ctx.fillRect(350, 48, 8, 3);
      break;
    case animTC > 328 && animTC < 390:
      ctx.fillText("Starting MS-DOS...", 350, 50);
      break;
    case animTC > 390 && animTC < 420:
      ctx.fillText("Starting MS-DOS...", 350, 50);
      ctx.fillText("Current date is " + dateNoGMT[0], 350, 100);
      ctx.fillText("Enter new date (mm-dd-yy): ", 350, 125);
      ctx.fillText("Current time is " + hour + ":" + minute + ":" + second, 350, 150);
      ctx.fillText("Enter new time :", 350, 175);
      break;
    case animTC > 420 && animTC < 520:
      ctx.fillText("Starting MS-DOS...", 350, 50);
      ctx.fillText("Current date is " + dateNoGMT[0], 350, 100);
      ctx.fillText("Enter new date (mm-dd-yy): ", 350, 125);
      ctx.fillText("Current time is " + hour + ":" + minute + ":" + second, 350, 150);
      ctx.fillText("Enter new time :", 350, 175);
      ctx.fillText("Microsoft(R) MS-DOS(R) Version 6.30", 350, 225);
      ctx.fillText("(C)Copyright Microsoft Corp 1981-1995.", 440, 250);
      break;
    case animTC > 520 && animTC < 619:
      ctx.fillText("Starting MS-DOS...", 350, 50);
      ctx.fillText("Current date is " + dateNoGMT[0], 350, 100);
      ctx.fillText("Enter new date (mm-dd-yy): ", 350, 125);
      ctx.fillText("Current time is " + hour + ":" + minute + ":" + second, 350, 150);
      ctx.fillText("Enter new time :", 350, 175);
      ctx.fillText("Microsoft(R) MS-DOS(R) Version 6.30", 350, 225);
      ctx.fillText("(C)Copyright Microsoft Corp 1981-1995.", 440, 250);
      ctx.fillText("C:\>", 350, 275);
      if (animTC % 10 === 0) ctx.fillRect(378, 275, 8, 3);
      break;
    case animTC > 619 && animTC < 919:
      typingSound.play();
      ctx.fillText("Starting MS-DOS...", 350, 50);
      ctx.fillText("Current date is " + dateNoGMT[0], 350, 100);
      ctx.fillText("Enter new date (mm-dd-yy): ", 350, 125);
      ctx.fillText("Current time is " + hour + ":" + minute + ":" + second, 350, 150);
      ctx.fillText("Enter new time :", 350, 175);
      ctx.fillText("Microsoft(R) MS-DOS(R) Version 6.30", 350, 225);
      ctx.fillText("(C)Copyright Microsoft Corp 1981-1995.", 440, 250);
      ctx.fillText("C:\>", 350, 275);
      if (animTC % 20 === 0 && textAnimI < textAnim.length - 1) textAnimI ++;
      var textW = ctx.measureText(textAnim[textAnimI]).width
      ctx.fillText(textAnim[textAnimI], 378,275);
      if (animTC % 10 === 0) ctx.fillRect(378 + textW + 1, 275, 8, 3);
      break;
    case animTC > 919:
      endBooting();
      compSound.stop();
      typingSound.stop();
      break; 
  }

  ctx.restore();
}

export { drawBoot };
