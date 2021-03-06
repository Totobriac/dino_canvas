import { map } from "./script.js";
import { collChecker, gannonCollChecker } from "./functions.js";
import { checkAction } from "./map.js";
import { game } from "../../script.js";

import { action } from "./actions.js";

var zeldaSprite = new Image();
zeldaSprite.src = "../assets/8_zeldouille/dino.png";

var zeldaAttackSprite = new Image();
zeldaAttackSprite.src = "../assets/8_zeldouille/dino_attack.png";

const zeldaHit = ["../assets/8_zeldouille/hit_1.png", "../assets/8_zeldouille/hit_2.png", "../assets/8_zeldouille/hit_3.png"];

class Hero {
  constructor(x, y, spriteSize, ctx) {
    this.x = x;
    this.y = y;
    this.spriteSize = spriteSize;
    this.ctx = ctx;
    this.wallCollision = false;
    this.exit;
    this.direction;
    this.lastDirection = 2;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.totalAttackFrame = 3;
    this.frame = 0;
    this.hitFrame = 0;
    this.isMoving = false;
    this.isAttacking = false;
    this.isHit = false;
    this.hitTickCount = 0;
    this.life = 8;
    this.hasSword = false;
    this.isEnteringCave = false;
    this.isExitingCave = false;
    this.isGrabingSword = false;
    this.cave = 0;
    this.hasKey = false;
  }
  draw() {

    this.hitAnimation();

    if (this.isAttacking === false && this.isGrabingSword === false) {
      if (this.frame != 0 && this.frame != 1) this.frame = 0;
      if (this.tickCount > this.maxTickCount) {
        this.tickCount = 0;
        this.frame === 0 ? this.frame = 1 : this.frame = 0
      } else {
        if (this.isMoving === true || map.zobi === true) this.tickCount += 1;
      }
      this.ctx.drawImage(zeldaSprite, 32 * this.frame, 32 * this.lastDirection, 32, 32, this.x, this.y, 32, 32);
    }
    if (this.isGrabingSword === true) {
      this.ctx.drawImage(zeldaSprite, 0, 128, 32, 32, this.x, this.y, 32, 32);
      this.ctx.drawImage(zeldaSprite, 32, 128, 32, 32, this.x - 15, this.y - 32, 32, 32);
    }

    if (this.isAttacking === true) {
      this.attack();
    }
  }

  move() {

    if (this.direction != undefined) this.lastDirection = this.direction;
    
    if (map && !map.zobi) {
      this.isMoving = true;
      if (game.keyDown.code === "ArrowDown") {
        this.direction = 0;
      }
      if (game.keyDown.code === "ArrowUp") {
        this.direction = 1;
      }
      if (game.keyDown.code === "ArrowRight") {
        this.direction = 2;
      }
      if (game.keyDown.code === "ArrowLeft") {
        this.direction = 3;
      }
      if (game.keyDown.key === "a" && this.hasSword) {
        if (game.keyDown.repeat) return;
        this.isAttacking = true;
      }
    }

    if (game.keyUp.code === "ArrowDown") {
      this.isMoving = false;
      this.direction = undefined;
    }
    if (game.keyUp.code === "ArrowUp") {
      this.isMoving = false;
      this.direction = undefined;
    }
    if (game.keyUp.code === "ArrowRight") {
      this.isMoving = false;
      this.direction = undefined;
    }
    if (game.keyUp.code === "ArrowLeft") {
      this.isMoving = false;
      this.direction = undefined;
    }
        

    var enemyCollison = collChecker(this.x, this.y, map.monsters);
    var missileCollison = collChecker(this.x, this.y, map.missiles);


    if (map.zora && map.zora.x) {
      var zoraCollision = collChecker(this.x, this.y, [map.zora]);
      if (zoraCollision.isColliding === true) {
        if (this.isHit === false) {
          this.isHit = true;
          this.life--;
        }
      }
    }

    if (map.gannon && map.gannon.x) {
      var gannonCollision = collChecker(this.x, this.y, [map.gannon]);
      if (gannonCollision.isColliding === true) {
        if (this.isHit === false) {
          console.log('gannon fault!!!!');
          this.isHit = true;
          this.life--;
        }
      }
    }

    if (enemyCollison.isColliding === true) {
      if (this.isHit === false) {
        this.isHit = true;
        this.life--;
      }

      var dir = enemyCollison.object.direction;
      if (dir === 0) {
        this.x += this.wallBounce(1, 0);
      } else if (dir === 1) {
        this.x -= this.wallBounce(-1, 0);
      } else if (dir === 2) {
        this.y += this.wallBounce(0, 1);
      } else if (dir === 3) {
        this.y -= this.wallBounce(0, -1);
      }
    }

    if (missileCollison.isColliding === true) {
      if (missileCollison.object.direction === 0 && this.lastDirection != 3 ||
        missileCollison.object.direction === 1 && this.lastDirection != 2 ||
        missileCollison.object.direction === 2 && this.lastDirection != 1 ||
        missileCollison.object.direction === 3 && this.lastDirection != 0 ||
        this.isAttacking === true || missileCollison.object.isPiercing === true) {
        if (this.isHit === false) {
          this.isHit = true;
          this.life--;
        }
      }
      else if (missileCollison.object.isPiercing === false) {
        missileCollison.object.isIntercepted = true;
      }

      var dir = missileCollison.object.direction;

      if (missileCollison.object.isPiercing === false) {
        if (dir === 0) {
          this.x += this.wallBounce(1, 0);
        } else if (dir === 1) {
          this.x -= this.wallBounce(-1, 0);
        } else if (dir === 2) {
          this.y += this.wallBounce(0, 1);
        } else if (dir === 3) {
          this.y -= this.wallBounce(0, -1);
        }
      }
    }

    if (map.zobi === false) {
      if (this.direction === 2) {
        this.y += this.align(this.y + 8, 16);
        var nextX = this.x + 4;

        if (nextX > 864) map.moveRight();

        this.wallCollision = this.checkCollision(nextX, this.y).isColliding;
        if (this.wallCollision === false) {
          this.x += 4;
        }
      } else if (this.direction === 3) {
        this.y -= this.align(this.y + 8, 16);
        var nextX = this.x - 4;

        if (nextX < 32) map.moveLeft();

        this.wallCollision = this.checkCollision(nextX, this.y).isColliding;
        if (this.wallCollision === false) {
          this.x -= 4;
        }
      } else if (this.direction === 0) {
        this.x += this.align(this.x + 8, 16);
        var nextY = this.y + 4;

        if (nextY > 352) map.moveDown();


        this.wallCollision = this.checkCollision(this.x, nextY).isColliding;
        if (this.wallCollision === false) {
          this.y += 4;
        }
      } else if (this.direction === 1) {
        this.x -= this.align(this.x + 8, 16);
        var nextY = this.y - 4;

        if (nextY < 32) map.moveUp();

        this.wallCollision = this.checkCollision(this.x, nextY).isColliding;
        if (this.wallCollision === false) {
          this.y -= 4;
        }
      }

      enemyCollison = collChecker(this.x, this.y, map.monsters);
      if (enemyCollison.isColliding === true) {
        if (this.isHit === false) {
          this.isHit = true;
          this.life--;
        }
        if (this.direction === 0) {
          this.y -= this.wallBounce(0, -1);
        } else if (this.direction === 1) {
          this.y += this.wallBounce(0, 1);
        } else if (this.direction === 2) {
          this.x -= this.wallBounce(-1, 0);
        } else if (this.direction === 3) {
          this.x += this.wallBounce(1, 0);
        }
      }

    } else {
      if (this.direction != undefined) this.exit = this.direction;
      if (this.exit === 3 && this.x < 840) this.x += 4;
      else if (this.exit === 2 && this.x > 40) this.x -= 4;
      else if (this.exit === 0 && this.y > 40) this.y -= 2;
      else if (this.exit === 1 && this.y < 328) this.y += 2;
    }

    var actionTile = checkAction(this.x, this.y, map.actual);

    if (actionTile != undefined) {
      action(actionTile);
    };

    this.draw();

  }
  checkCollision(x, y) {
    return collChecker(x, y, map.obstacles);
  }
  wallBounce(dirX, dirY) {
    for (let i = 0; i < 48; i++) {
      var exit = checkAction(this.x + dirX * i, this.y + dirY * i, map.actual);
      var bounce = collChecker(this.x + dirX * i, this.y + dirY * i, map.obstacles);
      if (bounce.isColliding === true || exit != undefined) return i - 1;
    }
    return 48;
  }
  align(coord, alignTo) {
    var remainder = coord % alignTo;
    var halfway = alignTo / 2;
    if (remainder > halfway) {
      return alignTo - remainder
    } else {
      return remainder
    }
  }
  attack() {
    if (this.tickCount > this.maxTickCount * 0.5) {
      this.tickCount = 0;
      this.frame < this.totalAttackFrame ? this.frame++ : this.isAttacking = false;
    } else {
      this.tickCount += 1;
    }
    var xOffset;
    var yOffset;
    var xHitOffset;
    var yHitOffset;
    switch (this.lastDirection) {
      case 0:
        xOffset = 0;
        yOffset = 0;
        xHitOffset = 0;
        yHitOffset = 20;
        break;
      case 1:
        xOffset = 5;
        yOffset = -23;
        xHitOffset = 0;
        yHitOffset = -20;
        break;
      case 2:
        xOffset = 0;
        yOffset = 0;
        xHitOffset = 20;
        yHitOffset = 0;
        break;
      case 3:
        xOffset = -22;
        yOffset = 0;
        xHitOffset = -20;
        yHitOffset = 0;
        break;
    }
    var hasHitMonster = collChecker(this.x + xHitOffset, this.y + yHitOffset, map.monsters);
    if (hasHitMonster.isColliding === true) {
      map.monsters[hasHitMonster.index].isDead = true;
    }
    if (map.gannon) {
      var hasHitGannon = gannonCollChecker(this.x + xHitOffset, this.y + yHitOffset, map.gannon.gannonX, map.gannon.gannonY);
      if (hasHitGannon) {
        if (map.gannon.isVisible === false) map.gannon.life --;
        map.gannon.isVisible = true;
      }
      else {
        map.gannon.isVisible = false;
      }
    }

    this.ctx.drawImage(zeldaAttackSprite, 54 * this.frame, 56 * this.lastDirection, 54, 56, this.x + xOffset, this.y + yOffset, 54, 56);
  }
  hitAnimation() {
    if (this.isHit === true) {
      this.hitTickCount++;
      if (this.hitTickCount % 10 === 0) {
        this.hitFrame < zeldaHit.length - 1 ? this.hitFrame++ : this.hitFrame = 0;
        zeldaSprite.src = zeldaHit[this.hitFrame];
      } else if (this.hitTickCount > 100) {
        this.hitTickCount = 0;
        this.isHit = false;
        zeldaSprite.src = "../assets/8_zeldouille/dino.png";
      }
    }
  }
}

export { Hero };
