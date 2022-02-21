import {
  Tool
} from "./tool.js";

import {
  tools,
  sink,
  onion,
  deleteTool,
  onTop,
} from "../tools.js";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var sideTinSprite = new Image();
sideTinSprite.src = "../assets/kitchen_level/side_tin.png";


var label = new Image();
label.src = "https://www.mockofun.com/wp-content/uploads/2020/04/tomato-sauce-label-5828.jpg";

var tempCanvas = document.createElement("canvas");
var tempContext = tempCanvas.getContext("2d");
tempCanvas.width = 400;
tempCanvas.height = 200;

var bibi = 9000;

class Tin extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow)
  }
  draw() {
    super.draw();

    if (this.inPlace) {
      sink.faucet = false;

      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);

      this.ctx.drawImage(sideTinSprite,488,96, 225,300)

      bibi += 10;
      console.log(bibi);
      drawLabel(bibi / 20000, 40, 30, this.ctx);
    }
  }
}

function drawLabel(ang, tilt, perspective,ctx) {

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


export {
  Tin
};
