import {
  Tool
} from "./tool.js";

import {
  points
} from "../control.js";

import {
  mouse
} from "../control.js";

import {
  tools,
  sink,
  onion,
} from "../tools.js";


var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var onionSprite = new Image();
onionSprite.src = "../assets/kitchen_level/onion.png";

var onionPeeledSprite = new Image();
onionPeeledSprite.src = "../assets/kitchen_level/onion_peeled.png";

class Onion extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.state = "intact";
    this.angle = 0;
    this.slice = 0;
    this.canSlice1 = false;
    this.canSlice2 = false;
    this.canChop = false;
    this.coef = 0.65;
    this.slices = [];
    this.canSlice = false;
    this.canMince = false;
    this.pieceWidth = 0;
    this.dif = -80;
    this.piecesWidth = [];
    this.piecesAXY = [];
  }
  draw() {

    super.draw();

    if (this.inPlace) {
      if (this.state === "intact") {
        this.ctx.setLineDash([4, 4]);
        this.ctx.strokeStyle = "red";

        this.ctx.beginPath();
        this.ctx.moveTo(505, 265);
        this.ctx.lineTo(505, 350);
        this.ctx.stroke();
        this.ctx.closePath();
        this.halfOnion();
      }
      if (this.state === "halfed") {
        onTop("onion");
        var backPic = document.getElementById("back");
        backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
        this.ctx.fillStyle = "rgb(0,0,0,0.81)";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);
        this.ctx.drawImage(onionSprite, (1200 - 548 * this.coef) / 2, 10, 548 * this.coef, 600 * this.coef);
        this.ctx.fillStyle = "green";
        this.ctx.beginPath();
        this.ctx.arc(1100, 300, 40, 0, 2 * Math.PI);
        this.ctx.fill();
        this.peel();
      }
      if (this.state === "peeled" && this.pieceWidth === 0) this.beheading();

      if (this.state === "peeled" || this.state === "beheaded") {
        onTop("chefKnife");
        this.knife.isSelected = true;
        this.knife.isChopping = true;
        this.ctx.fillStyle = "rgb(0,0,0,0.81)";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate((Math.PI / 180) * this.angle);

        var xOffset = -(548 * this.coef) / 2 - 3;

        var yOffset = -((600 * this.coef) / 2) + this.pieceWidth * this.coef;

        this.ctx.drawImage(onionPeeledSprite, 0, this.pieceWidth, 548, 600 - this.pieceWidth, xOffset, yOffset, 548 * this.coef, (600 - this.pieceWidth) * this.coef);

        this.ctx.setLineDash([4, 4]);
        this.ctx.strokeStyle = "red";
        if (this.state === "peeled") {
          this.ctx.beginPath();
          this.ctx.moveTo(-180, -80);
          this.ctx.lineTo(180, -80);
          this.ctx.stroke();
          this.ctx.closePath();
        }

        if (this.canChop === false) this.sliceOnion();
        this.ctx.restore();
      }
      if (this.canChop === true) {
        this.chop();
      }

      if (this.canMince === true) {
        this.mince();
      }
    }
  }
  peel() {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = "rgba(0,0,0,1)"
    for (let i = 0; i < points.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(points[i].x, points[i].y, 30, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
  donePeeling(mouse) {
    var dist = Math.sqrt((mouse.x - 1100) * (mouse.x - 1100) + (mouse.y - 300) * (mouse.y - 300));
    if (dist < 40) {
      this.inPlace = false;
      this.state = "peeled";
      var backPic = document.getElementById("back");
      backPic.style.background = "none";
    }
  }
  halfOnion() {
    if (mouse.upX > 508 && mouse.upX < 515 && tools[tools.length - 1].name === "chefKnife") {
      this.state = "halfed";
      sink.faucet = false;
    }
  }
  spinOnion(angle) {
    this.angle = angle;
  }
  beheading() {
    if ((this.angle === 90 && mouse.upX > 690 && mouse.upX < 694) ||
      (this.angle === 270 && mouse.upX > 529 && mouse.upX < 534)) {
      this.state = "beheaded";
      this.pieceWidth = 180;
    }
  }
  sliceOnion() {
    if (this.slice === 0 && this.state === "beheaded") {
      this.ctx.beginPath();
      this.ctx.moveTo(-78, -80);
      this.ctx.lineTo(80, -80);

      this.ctx.arc(0, 0, 110, 7 * Math.PI / 4, Math.PI / 3, false);
      this.ctx.arc(0, 0, 110, 2 * Math.PI / 3, 5 * Math.PI / 4, false);

      this.ctx.closePath();
      this.ctx.stroke();

      if (mouse.x > 750) this.canSlice1 = true;
      if (this.knife.x > 499 && this.knife.x < 502) {
        this.slice = 1;
        this.canSlice1 = false;
      }
    }

    if (this.slice === 1) {
      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeStyle = "blue";

      this.ctx.beginPath();
      this.ctx.moveTo(-48, -50);
      this.ctx.lineTo(50, -50);

      this.ctx.arc(0, 0, 70, 7 * Math.PI / 4, Math.PI / 3, false);
      this.ctx.arc(0, 0, 70, 2 * Math.PI / 3, 5 * Math.PI / 4, false);

      this.ctx.closePath();
      this.ctx.stroke();

      if (mouse.x > 750) this.canSlice2 = true;
      if (this.knife.x > 534 && this.knife.x < 540) {
        this.canChop = true;
      }
    }
  }
  chop() {
    this.ctx.save();

    var x = canvas.width / 2;
    var y = canvas.height / 2;

    this.ctx.translate(x, y);
    this.ctx.rotate((Math.PI / 180) * this.angle);

    if (this.canMince === false) {
      this.ctx.beginPath();

      this.ctx.arc(0, 0, 125, 2 * Math.PI, Math.PI, false);

      this.ctx.setLineDash([4, 4]);
      this.ctx.lineWidth = 15;

      this.ctx.stroke();

      this.ctx.closePath();
    }

    this.ctx.strokeStyle = "green";
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([]);


    this.slices.forEach((slice, i) => {
      if (-(slice.y - y) > onion.dif) {
        this.ctx.beginPath();
        this.ctx.moveTo(-(slice.x - x), -(slice.y - y));
        this.ctx.lineTo(-(slice.x - x), onion.dif);
        this.ctx.stroke();
      }
    });

    this.ctx.restore();

    if (this.angle === 180) {

      var distance = Math.sqrt((x - (this.knife.x + this.knife.width / 2)) * (x - (this.knife.x + this.knife.width / 2)) +
        (y - this.knife.y) * (y - this.knife.y)
      )
      if (distance > 120 && this.knife.y < 200) {
        this.canSlice = false;
      } else {
        this.canSlice = true;
      }
    };

    if (this.slices.length === 10) {
      this.canMince = true;
      this.slices.sort(function (a, b) {
        return a.x - b.x;
      });
      this.slices.push({
        x: 735,
        y: undefined,
        width: undefined
      });
      this.slices.unshift({
        x: 465,
        y: undefined,
        width: undefined
      });
    }
  }
  mince() {
    if (this.angle === 90) {
      for (let i = 0; i < this.slices.length - 1; i++) {
        this.slices[i].width = this.slices[i + 1].x - this.slices[i].x;
      }

      var x = canvas.width / 2;
      var y = canvas.height / 2;

      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate((Math.PI / 180) * 90);

      for (let i = 0; i < this.piecesWidth.length; i++) {

        function setPiece () {
          return {
            angle : -20 + Math.floor(Math.random() * 40) ,
            x: -8 + Math.floor(Math.random() * 16) ,
            y: -8 + Math.floor(Math.random() * 16),
          }
        }

        if (this.piecesAXY.length === i ) {
          this.piecesAXY.push(Array.from({length: 11}, () => setPiece() ));
        }

        var Yoffset = -(600 * this.coef) / 2 - 10 + (this.piecesWidth[i].pW - this.piecesWidth[i].w) * 0.65;

        for (let j = 0; j < 11; j++) {

          var Xoffset = -(548 * this.coef) / 2 - 3 + j * 35;

          this.ctx.save();
          this.ctx.translate(Xoffset, Yoffset);
          this.ctx.rotate(this.piecesAXY[i][j].angle * Math.PI / 180);

          this.ctx.drawImage(
            onionPeeledSprite,
            j * 54,
            this.piecesWidth[i].pW - this.piecesWidth[i].w,
            54,
            this.piecesWidth[i].w,
            this.piecesAXY[i][j].x,
            this.piecesAXY[i][j].y,
            54 * this.coef,
            this.piecesWidth[i].w * this.coef
          );

          this.ctx.restore();

        }
      }

      this.ctx.restore();
    };
  }
}


function onTop(tool) {
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].name === tool) {
      var tool = tools[i];
      tools.splice(i, 1);
      tools.push(tool);
    }
  }
}


export {
  Onion
}
