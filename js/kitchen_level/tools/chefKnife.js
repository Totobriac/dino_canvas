import {
  Tool
} from "./tool.js";

class ChefKnife extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow)
  }
  draw() {
    super.draw();

    
  }
}

export { ChefKnife };
