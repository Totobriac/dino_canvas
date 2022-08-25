import { Dino } from "../character/mainDino.js";

var dinoSprite = new Image();
dinoSprite.src = "./assets/dino/dino_still.png";

var dinoSpriteLeft = new Image();
dinoSpriteLeft.src = "./assets/dino/dino_still_left.png";

var dinoWalk = new Image();
dinoWalk.src = "./assets/dino/dino_walk.png";

var dinoWalkLeft = new Image();
dinoWalkLeft.src = "./assets/dino/dino_walk_left.png";


class MansionDino extends Dino {
  constructor(ctx, x, y, width, height, right, left, top, bottom) {
    super(ctx, x, y, width, height);
    this.isPushing = false;
    this.isPulling = false;
    this.right = right;
    this.left = left;
    this.top = top;
    this.bottom = bottom;
  }
  moveAround(game, sprite) {
    this.checkBundaries();
    var collision = sprite.checkCollision(this.x, this.y, this.spriteWidth * this.scale, this.spriteHeight / 2 * this.scale);
    var mouseX = game.mousePosition.x + 12;
    var mouseY = game.mousePosition.y + 12;
    var dx;
    this.x - mouseX < 0 ? dx = this.x - mouseX + 80 : dx = this.x - mouseX;
    var dy;
    this.y - mouseY < 0 ? dy = this.y - mouseY + 70 : dy = this.y - mouseY + 100;

    if (!this.isPushing && !this.isPulling) {
      if (mouseX != this.x && (dx > 10 || dx < -10)) {

        this.isMoving = true;
        if (!collision) dx > 0 ? this.x -= game.gamespeed * 0.5 : this.x += game.gamespeed * 0.5;
        if (collision && this.x < sprite.x && dx >= 0) {
          this.isMoving = true;
          this.x -= game.gamespeed * 0.5;
        };
        if (collision && this.x > sprite.x && dx <= 0) {
          this.isMoving = true;
          this.x += game.gamespeed * 0.5;
        }
      }
      if (mouseY != this.y && (dy > 10 || dy < -10)) {
        this.isMoving = true;
        dy > 0 ? this.y -= game.gamespeed * 0.5 : this.y += game.gamespeed * 0.5;
      }

      if (dx <= 10 && dx >= -10) {
        this.isMoving = false;
      }

      if (collision) this.isMoving = false;
      dx > 0 ? this.isWalkingLeft = true : this.isWalkingLeft = false;
    } else if (this.isPushing) {
      this.isMoving = true;
      this.isWalkingLeft = true;
    } else if (this.isPulling) {
      this.isMoving = true;
      this.isWalkingLeft = false;
    }

  }
  animateDino() {
    if (this.isWalkingLeft) {
      if (!this.isMoving) {
        this.frameIndex = 0;
        this.draw(1, 1, dinoSpriteLeft, 0.8);
      } else {
        this.draw(2, 2, dinoWalkLeft, 0.8);
      }
    } else {
      if (!this.isMoving) {
        this.frameIndex = 0;
        this.draw(1, 1, dinoSprite, 0.8);
      } else {
        this.draw(2, 2, dinoWalk, 0.8)
      }
    }
  }
  checkBundaries() {
    if (this.x >= this.right) {
      this.x = this.right;
    }
    if (this.x <= this.left) {
      this.x = this.left;
    }
    if (this.y <= this.top) {
      this.y = this.top;
    }
    if (this.y >= this.bottom) {
      this.y = this.bottom;
    }
  }
  checkIfReach(sprite) {
    if (this.x + (this.spriteWidth * this.scale) + 5 < sprite.x - 5 || this.x - 5 > sprite.x + (sprite.spriteWidth * sprite.scale) + 6) {
      return false;
    } else {
      return true;
    }
  }
}

export { MansionDino };
