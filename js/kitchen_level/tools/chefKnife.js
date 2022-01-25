import {
  Tool
} from "./tool.js";

import { mouse } from "../control.js";

var chefKnifeUpSprite = new Image();
chefKnifeUpSprite.src = "../assets/kitchen_level/chef_knife_up.png";

var chefKnifeSprite = new Image();
chefKnifeSprite.src = "../assets/kitchen_level/chef_knife.png";

class ChefKnife extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
  }
  draw() {

    if (this.isSelected === true) {
      this.sprite = chefKnifeUpSprite;
      this.width = 30;
      this.height= 200;
      this.x = mouse.x - this.width;
      this.y = mouse.y - this.height * 3/4;
    }
    else {
      this.sprite = chefKnifeSprite;
      this.width = 200;
      this.height= 30;
      this.x = 400;
      this.y = 190;
    }
    super.draw();

  }
}

export {
  ChefKnife
};
