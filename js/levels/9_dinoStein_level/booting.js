var date = new Date();
var strDate = date.toString();
var dateNoGMT = strDate.split('G');

var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();

var animTickCount = 0;

function drawBoot(ctx) {

  ctx.save();

  // ctx.fillStyle = "black";
  // ctx.fillRect(0,0,1200,400);
  //
  // ctx.font = "20px Dos";
  // ctx.fillStyle = "rgb(255, 255 ,255)";
  //
  // ctx.fillText("Starting MS-DOS..." , 350, 50);
  //
  // ctx.fillText("Current date is " + dateNoGMT[0] , 350, 100);
  //
  // ctx.fillText("Enter new date (mm-dd-yy): ",350,125);
  //
  // ctx.fillText("Current time is "+ hour + ":" + minute + ":" + second, 350, 150);
  //
  // ctx.fillText("Enter new time :", 350, 175);
  //
  //
  // ctx.fillText("Microsoft(R) MS-DOS(R) Version 6.30", 350, 225);
  //
  // ctx.fillText("(C)Copyright Microsoft Corp 1981-1995.", 440, 250);
  //
  // ctx.fillText("C:\>dinostein.exe", 350, 275);

  ctx.restore();
}

export { drawBoot };
