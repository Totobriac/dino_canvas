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

class ExitingSub {
  constructor(x,y, sprite, ctx) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.ctx = ctx;
    this.coef = 0.8;
  }
  draw() {
    this.update();
    this.ctx.drawImage(this.sprite, this.x , this.y, this.sprite.width * this.coef, this.sprite.height * this.coef)
  }
  update() {
    
  }
}

var exitingSub;

function drawFinalScene(ctx) {

  if (!exitingSub) exitingSub = new ExitingSub(880,260, subRight, ctx);

  ctx.drawImage(entrance, 198, 0);

  exitingSub.draw();

  ctx.drawImage(rock, 198, 0);
  ctx.drawImage(waterBottom, 198,0);
  ctx.drawImage(waterTop, 198,0);

}

export { drawFinalScene };
