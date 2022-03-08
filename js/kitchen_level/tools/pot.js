import {
  Tool
} from "./tool.js";
import {
  burners
} from "./stove.js";
import {
  Point
} from "./bubble.js";
import {
  sink,
  deleteTool
} from "../tools.js";

var points = [];

var frame = 0;
var maxFrame = 12;
var maxRadius = 0;

var radiusFrame = 0;

var maxPoints = 50;


class Pot extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow)
    this.isFilled = false;
    this.pastas = [];
    this.onBurner = false;
    this.waterLevel = 0;
  }
  draw() {
    super.draw();

    if (this.inPlace && sink.sinkIsOn) {
      this.ctx.fillStyle = "rgba(39, 200, 245, 0.27)";
      if (this.waterLevel < 72) this.waterLevel += 0.25;
      this.ctx.beginPath();
      this.ctx.arc(125, 130, this.waterLevel, 0, 2 * Math.PI, false);
      this.ctx.fill();
    }

    if (this.waterLevel > 50 && this.isSelected && !this.onBurner) {
      this.isFilled = true;
      this.inPlace = false;
      this.shadow = {
        x: 1092,
        y: 170,
        r: 60
      };
      this.perfX = 1000;
      this.perfY = 90;
    }

    if (sink.sinkIsOn === false) {
      this.ctx.fillStyle = "rgba(39, 200, 245, 0.27)";
      this.ctx.beginPath();
      this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.waterLevel, 0, 2 * Math.PI, false);
      this.ctx.fill();
    }

    if (this.isFilled === true && this.inPlace === true && burners[3].isOn === true) {
      this.onBurner = true;
      if (maxRadius == 5 && this.pasta.inPlace && !this.pasta.isUp) {
        this.pasta.inPot();
      }
      this.boil();
    }
  }
  boil() {
    if (radiusFrame > maxFrame * 10 && maxRadius < 5) {
      maxRadius++;
      radiusFrame = 0;
    } else {
      radiusFrame++;
    }

    for (let i = 0; i < points.length; i++) {

      this.ctx.strokeStyle = points[i].color;

      if (frame > maxFrame) {
        frame = 0;
        points[i].radius += 1;
      } else {
        frame++;
      }
      if (points[i].dist + points[i].radius > 60 || points[i].radius > maxRadius) {
        points.splice(i, 1);
        i--;
      } else {
        this.ctx.beginPath();
        this.ctx.arc(points[i].x, points[i].y, points[i].radius, 0, 2 * Math.PI);
        this.ctx.stroke();
      }
    }
    populatePoints();
  }
}

function populatePoints() {
  for (let i = 0; points.length < maxPoints; i++) {
    var point = new Point();
    if (point.dist < 63) {
      points.push(point);
    }
  }
}


export {
  Pot
};
