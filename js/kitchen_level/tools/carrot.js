import {
  Tool
} from "./tool.js";

class Carrot extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow)
  }
  
}

export {
  Carrot
};
