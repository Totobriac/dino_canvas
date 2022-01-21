import { sinkIsOn } from "./sink.js";
import { selectedTool } from "../control.js";
import { boil } from "./bubble.js";
import { Tool } from "./tool.js";

var waterLevel = 0;

class Pot extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow)
    this.isFilled = false;
  }
  draw() {
    super.draw();

    if (this.inPlace && sinkIsOn) {
      this.ctx.fillStyle = "rgba(39, 200, 245, 0.27)";
      if (waterLevel < 72) waterLevel += 0.25;
      this.ctx.beginPath();
      this.ctx.arc(125, 130, waterLevel, 0, 2 * Math.PI, false);
      this.ctx.fill();
    }

    if (waterLevel > 50 && waterLevel < 64 && selectedTool != undefined && selectedTool.name === "pot") {
      this.isFilled = true;
      this.inPlace = false;
      this.shadow = { x: 1092, y: 170, r: 60 };
      this.perfX = 1000;
      this.perfY = 90;
    }

    if (this.inPlace === false || this.inPlace && sinkIsOn === false) {
      this.ctx.fillStyle = "rgba(39, 200, 245, 0.27)";
      this.ctx.beginPath();
      this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, waterLevel, 0, 2 * Math.PI, false);
      this.ctx.fill();
    }


    if (this.isFilled === true && this.inPlace === true) {
      boil(this.ctx)
    }
  }
}


export { Pot };
