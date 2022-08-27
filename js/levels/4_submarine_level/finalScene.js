var entrance = new Image();
entrance.src = "./assets/4_submarine/indy_entrance.png";

var rock = new Image();
rock.src = "./assets/4_submarine/rock.png";

var waterBottom = new Image();
waterBottom.src = "./assets/4_submarine/waterOverlay.png";

var waterTop = new Image();
waterTop.src = "./assets/4_submarine/waterTop.png"


var exit = new Image();
exit.src = "./assets/4_submarine/indy_exit.png";

var maze = new Image();
maze.src = "./assets/4_submarine/maze.png";

var subRight = new Image();
subRight.src = "./assets/4_submarine/left_submarine.png";


function drawFinalScene(ctx) {

  ctx.drawImage(entrance, 198, 0);

  ctx.drawImage(subRight, 880,260,102 * 0.8,115 *0.8)

  ctx.drawImage(rock, 198, 0);
  ctx.drawImage(waterBottom, 198,0);
  ctx.drawImage(waterTop, 198,0);

}

export { drawFinalScene };
