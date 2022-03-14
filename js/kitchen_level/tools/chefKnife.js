import { Tool } from "./tool.js";
import { mouse } from "../control.js";

var chefKnifeUpSprite = new Image();
chefKnifeUpSprite.src = "./assets/kitchen_level/chef_knife_up.png";

var chefKnifeSprite = new Image();
chefKnifeSprite.src = "./assets/kitchen_level/chef_knife.png";

var chefKnifeSpineSprite = new Image();
chefKnifeSpineSprite.src = "./assets/kitchen_level/chef_knife_spine.png";

var chefKnifeSideSprite = new Image();
chefKnifeSideSprite.src = "./assets/kitchen_level/chef_knife_up.png";


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
    else if (this.isChopping === true && (this.onion.state != "beheaded" || this.onion.canChop === true)) {
      this.sprite = chefKnifeSpineSprite;
      this.width = 22;
      this.height = 440;
      this.x = mouse.x - this.width;
      this.y = mouse.y - this.height * 1 / 3;
    }
    else if (this.onion.state === "beheaded") {
      this.sprite = chefKnifeUpSprite;
      this.width = 72;
      this.height = 440;
      this.x = mouse.x - this.width;
      this.y = mouse.y - this.height * 2 / 3;
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
