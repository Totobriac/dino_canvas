import { Tool } from "./tool.js";
import { mouse, key } from "../control.js";
import { onion } from "../toolGeneration.js";
import { sink, deleteTool, onTop, addStep, tools } from "../tools.js";

import { sound } from "../../../sound.js";
import { playSound, stopSound } from "../sound.js";

var sliceSound = new sound("./assets/3_kitchen/sounds/slice_onion.mp3", false);
var peelSound = new sound("./assets/3_kitchen/sounds/peel_onion.mp3", true);
var sideCutSound = new sound("./assets/3_kitchen/sounds/side_cut.mp3", true);
var fryingSound = new sound("./assets/3_kitchen/sounds/frying_onion.mp3", false);

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "./assets/3_kitchen/chopping_board.png";

var onionSprite = new Image();
onionSprite.src = "./assets/3_kitchen/onion.png";

var onionPeeledSprite = new Image();
onionPeeledSprite.src = "./assets/3_kitchen/onion_peeled.png";

var onionChoppedSprite = new Image();
onionChoppedSprite.src = "./assets/3_kitchen/onion_chopped.png";

var arrowkeysSprite = new Image();
arrowkeysSprite.src = "./assets/3_kitchen/arrows.png";

var arrowRightSprite = new Image();
arrowRightSprite.src = "./assets/3_kitchen/arrow_right.png";

var arrowDownSprite = new Image();
arrowDownSprite.src = "./assets/3_kitchen/arrow_down.png";

var rgb = {
  r: 0,
  g: 0,
  b: 0
};

var count = 0;
var i = -4;
var blockSize = 5;

var sprite = arrowkeysSprite;

class Onion extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, pan, sound) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound);
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
    this.pan = pan;
    this.points = [];
  }
  draw() {
    this.spinOnion();

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
    }
    if (this.state === "halfed") {
      sink.faucet = false;

      onTop("onion");

      var backPic = document.getElementById("back");
      backPic.style.background = "url('./assets/3_kitchen/peeled_onion_back.png')";

      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);
      this.ctx.drawImage(onionSprite, (1200 - 548 * this.coef) / 2, 10, 548 * this.coef, 600 * this.coef);

      this.peel();
    }
    if (this.state === "peeled" && this.pieceWidth === 0) this.beheading();

    if (this.state === "peeled" || this.state === "beheaded") {

      sink.faucet = false;
      onTop("chefKnife");
      this.chefKnife.isSelected = true;
      this.chefKnife.isChopping = true;
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
      this.ctx.strokeStyle = "red";
      this.ctx.setLineDash([4, 4]);

      if (this.state === "peeled") {
        this.ctx.beginPath();
        this.ctx.moveTo(-180, -80);
        this.ctx.lineTo(180, -80);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      if (!this.canChop) this.sliceOnion();
      this.ctx.restore();
    }
    if (this.canChop) {
      sprite = arrowDownSprite;
      this.chop();
    }

    if (this.canMince) {
      sprite = arrowRightSprite;
      this.mince();
    }

    if (this.state === "done") {
      this.perfX = this.pan.x + this.pan.width / 2;
      this.perfY = this.pan.y + this.pan.height / 10;
      this.shadow = {
        x: this.perfX + 28,
        y: this.perfY + 28,
        r: 28
      }
      if (this.inPlace === true) {
        playSound(fryingSound, 0.3);
        this.pan.hasOnion = true;
        addStep(8);
        deleteTool("onion");
      }
    } else {
      this.ctx.drawImage(sprite, 1050, 250, 583 * 0.2, 411 *0.2);
    }
  }
  peel() {
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = "rgba(0,0,0,1)"
    for (let i = 0; i < this.points.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(this.points[i].x, this.points[i].y, 30, 0, 2 * Math.PI);
      this.ctx.fill();
    }
    this.ctx.restore();

    rgb = {r: 0, g: 0, b: 0 };
    count = 0;
    i = -4;
    blockSize = 5;
    this.getAverageColor();
  }
  getAverageColor() {
    var imgData = this.ctx.getImageData(465, 40, 290, 320);
    var data = imgData.data;
    while ((i += blockSize * 4) < data.length) {
      ++count;
      rgb.r += data[i];
      rgb.g += data[i + 1];
      rgb.b += data[i + 2];
    }

    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    if (rgb.r != 0 && rgb.r < 11 && rgb.g < 23 && rgb.b < 10 && this.state === "halfed") {
      this.donePeeling();
    }
  }
  donePeeling() {
    stopSound(peelSound);
    this.inPlace = false;
    this.state = "peeled";
    var backPic = document.getElementById("back");
    backPic.style.background = "none";
  }
  halfOnion() {
    if (mouse.upX > 508 && mouse.upX < 515 && tools[tools.length - 1].name === "chefKnife") {
      this.state = "halfed";
      playSound(sliceSound, 0.3);
    }
  }
  spinOnion() {
    switch (key) {
      case "ArrowUp":
      this.angle = 0;
      break;
      case "ArrowRight":
      this.angle = 90;
      break;
      case "ArrowDown":
      this.angle = 180;
      break;
      case "ArrowLeft":
      this.angle = 270;
      break;
    };
  }
  beheading() {
    sprite = arrowRightSprite;
    if ((this.angle === 90 && mouse.upX > 690 && mouse.upX < 694) ||
      (this.angle === 270 && mouse.upX > 529 && mouse.upX < 534)) {
        playSound(sliceSound, 0.3);
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
      if (this.canSlice1 && mouse.x < 750) playSound(sideCutSound, 1);

      if (this.chefKnife.x > 499 && this.chefKnife.x < 502) {
        this.slice = 1;
        this.canSlice1 = false;
        stopSound(sideCutSound);
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
      if (this.canSlice2 && mouse.x < 750) playSound(sideCutSound, 1);

      if (this.chefKnife.x > 534 && this.chefKnife.x < 540) {
        this.canChop = true;
        stopSound(sideCutSound);
      }
    }
  }
  sliceIt() {
    if (this.canSlice && this.angle === 180 && !this.canMince) {
      stopSound(sliceSound);
      playSound(sliceSound, 0.3);
      this.slices.push({
        x: this.chefKnife.x + this.chefKnife.width / 2,
        y: this.chefKnife.y,
        width: undefined,
      })
    }
    if (this.angle === 90 && this.canMince === true) {
      var x = this.chefKnife.x + this.chefKnife.width / 2;
      var startX = 678 - x;
      var oldWidth = this.pieceWidth;
      if (180 + startX / 0.65 > this.pieceWidth) {
        var newW = 180 + startX / 0.65 - oldWidth;
        this.pieceWidth = 180 + startX / 0.65;
        this.piecesWidth.push({w: newW, pW:this.pieceWidth})
        this.dif = 612 - mouse.x;
      }
      if (startX > 200 && this.piecesWidth.length > 9) {
        this.done();
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
      this.ctx.strokeStyle = "red";
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
      var distance = Math.sqrt((x - (this.chefKnife.x + this.chefKnife.width / 2)) * (x - (this.chefKnife.x + this.chefKnife.width / 2)) +
        (y - this.chefKnife.y) * (y - this.chefKnife.y)
      )
      if (distance > 120 && this.chefKnife.y < 200) {
        this.canSlice = false;
      } else {
        this.canSlice = true;
      }
    };

    if (this.slices.length === 10) {
      this.canMince = true;
      this.slices.sort(function(a, b) {
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
    this.perfX = undefined;
    this.perfY = undefined;
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

        function setPiece() {
          return {
            angle: -20 + Math.floor(Math.random() * 40),
            x: -8 + Math.floor(Math.random() * 16),
            y: -8 + Math.floor(Math.random() * 16),
          }
        }

        if (this.piecesAXY.length === i) {
          stopSound(sliceSound);
          playSound(sliceSound, 0.3);
          this.piecesAXY.push(Array.from({
            length: 11
          }, () => setPiece()));
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
  addPoints(e) {
    if (this.inPlace && this.state === "halfed" && e.offsetX > 400 && e.offsetX < 800) {
      playSound(peelSound, 0.3);
      this.points.push({
        x: e.offsetX,
        y: e.offsetY
      })
    }
  }
  done() {
    sink.faucet = true;
    this.state = "done";
    this.canMince = false;
    this.canChop = false;
    this.chefKnife.isChopping = false;
    tools.forEach((tool, i) => {
      tool.isSelected = false;
    });
    this.sprite = onionChoppedSprite;
  }
}


export { Onion };
