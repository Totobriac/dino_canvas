import { Tool } from "./tool.js";
import { mouse } from "../control.js";

import { sound } from "../../../sound.js";
import { playSound, stopSound } from "../sound.js";

var grabKnifeSound = new sound("../assets/3_kitchen/sounds/grab_knife.wav", false);

var chefKnifeUpSprite = new Image();
chefKnifeUpSprite.src = "./assets/3_kitchen/chef_knife_up.png";

var chefKnifeSprite = new Image();
chefKnifeSprite.src = "./assets/3_kitchen/chef_knife.png";

var chefKnifeSpineSprite = new Image();
chefKnifeSpineSprite.src = "./assets/3_kitchen/chef_knife_spine.png";

var chefKnifeSideSprite = new Image();
chefKnifeSideSprite.src = "./assets/3_kitchen/chef_knife_up.png";

var firstSelection = true;

class ChefKnife extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, onion) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.onion = onion;
    this.isChopping = false;
  }
  draw() {

    if (this.isSelected && !this.isChopping) {

      if (firstSelection) playSound(grabKnifeSound, 0.3);
      if (this.inPlace) firstSelection = true;
      firstSelection = false;
      this.sprite = chefKnifeSpineSprite;
      this.width = 11;
      this.height = 200;
      this.x = mouse.x - this.width;
      this.y = mouse.y - this.height * 3 / 4;
    }
    else if (this.isChopping && (this.onion.state != "beheaded" || this.onion.canChop )) {
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

export { ChefKnife };
