import { Tool } from "./tool.js";
import { sink, deleteTool } from "../tools.js";
import { pasta } from "../toolGeneration.js";


var choppingBoardSprite = new Image();
choppingBoardSprite.src = "./assets/3_kitchen/chopping_board.png";

var sideTinSprite = new Image();
sideTinSprite.src = "./assets/3_kitchen/side_tin.png";

var label = new Image();
label.src = "https://www.mockofun.com/wp-content/uploads/2020/04/tomato-sauce-label-5828.jpg";

var tempCanvas = document.createElement("canvas");
var tempContext = tempCanvas.getContext("2d");
tempCanvas.width = 400;
tempCanvas.height = 200;


class Tin extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, tinOpener, pan) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.tinOpener = tinOpener;
    this.bibi = 9000;
    this.pan = pan;
    this.isOpen = false;
  }
  draw() {

    super.draw();

    if (this.isOpen === true) {
      sink.faucet = true;
      this.ctx.fillStyle = "red";
      this.ctx.beginPath();
      this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 19, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    if (this.inPlace && this.tinOpener.inPlace || this.tinOpener.isOpening) {

      sink.faucet = false;
      this.tinOpener.isOpening = true;

      pasta.isDisplayed = false;

      var backPic = document.getElementById("back");
      backPic.style.background = "url('./assets/3_kitchen/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);

      this.ctx.drawImage(sideTinSprite, 488, 96, 225, 300);

      drawLabel(this.bibi / 20000, 40, 30, this.ctx);
    }

    if (this.inPlace && this.isOpen && this.isSelected) {
      this.pan.hasSauce = true;
      deleteTool("tin");
    }
  }
  rotate() {
    this.bibi += 30;
  }
  open() {
    this.perfX = this.pan.x + this.pan.width / 2;
    this.perfY = this.pan.y + this.pan.height / 10;
    this.shadow = {
      x: this.perfX + 28,
      y: this.perfY + 28,
      r: 28
    }
    this.isOpen = true;
    pasta.isDisplayed = true;
  }
}

function drawLabel(ang, tilt, perspective, ctx) {

  tempContext.drawImage(label, 0, 0, 400, 200);

  var step = 1 / Math.max(tempCanvas.width, 400);

  for (var i = 0; i < 1; i += step) {
    var a = i * Math.PI;
    var a1 = (i + step * 2) * Math.PI;
    var ix = i * tempCanvas.width * 1.2;
    var iw = step * tempCanvas.width * 1.2;
    a += ang * Math.PI * 2;
    a1 += ang * Math.PI * 2;
    a = Math.PI - a;
    a1 = Math.PI - a1;
    var x = canvas.width * 0.5;
    var y = canvas.height * 0.1;

    var x1 = x + Math.cos(a1) * 110;
    var y1 = y + Math.sin(a) * tilt;
    x += Math.cos(a) * 110;
    y += Math.sin(a) * tilt;
    var s = Math.sin(a);
    var s1 = Math.sin(a1);
    if (s > 0 || s1 > 0) {
      ctx.drawImage(
        tempCanvas,
        ix,
        0,
        iw,
        tempCanvas.height,
        x1,
        y - s * perspective * 0.5 + 90,
        x - x1,
        200 + s * perspective
      );
    }
  }
}

export { Tin };
