import {
  Tool
} from "./tool.js";

import { mouse } from "../control.js";

var chefKnifeUpSprite = new Image();
chefKnifeUpSprite.src = "../assets/kitchen_level/chef_knife_up.png";

var chefKnifeSprite = new Image();
chefKnifeSprite.src = "../assets/kitchen_level/chef_knife.png";

var chefKnifeSpineSprite = new Image();
chefKnifeSpineSprite.src = "../assets/kitchen_level/chef_knife_spine.png";


class ChefKnife extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, onion) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, onion);
    this.onion = onion;
    this.isChopping = false;
  }
  draw() {

    if (this.isSelected === true && this.isChopping === false) {
      this.sprite = chefKnifeSpineSprite;
      this.width = 11;
      this.height = 200;
      this.x = mouse.x - this.width;
      this.y = mouse.y - this.height * 3 / 4;
    }
    else if (this.isSelected === true && this.isChopping === true) {
      this.sprite = chefKnifeSpineSprite;
      this.width = 22;
      this.height = 400;
      this.x = mouse.x - this.width;
      this.y = mouse.y - this.height * 3 / 4;
    }
    else {
      this.sprite = chefKnifeSprite;
      this.width = 200;
      this.height = 33;
      this.x = 400;
      this.y = 190;
    }
    super.draw();

  }
}

export {
  ChefKnife
};
