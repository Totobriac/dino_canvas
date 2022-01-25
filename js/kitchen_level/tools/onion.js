import {
  Tool
} from "./tool.js";

class Onion extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow)
  }
  draw() {
    super.draw();
    if (this.inPlace) {
      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)"
      this.ctx.fillRect(0,0,canvas.width, canvas.height);
    }
  }

}

export {Onion}
