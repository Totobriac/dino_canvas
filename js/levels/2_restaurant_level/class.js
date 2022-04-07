import { top, dino } from "../../script.js";
import { charOffset } from "./dinoAnimation.js";

class Character {
    constructor(ctx, game, sprite, x, y, direction, frames, speed, width, height, coef) {
        this.x = x;
        this.sprite = sprite;
        this.y = y + top;
        this.direction = direction;
        this.frames = frames;
        this.width = width;
        this.height = height;
        this.frameIndex = 0;
        this.ticksPerFrame = 12;
        this.tickCount = 0;
        this.ctx = ctx;
        this.speed = speed;
        this.gamespeed = game.gamespeed;
        this.coef = coef;
    }
    updateChar() {
        this.tickCount += 1;
        dino.state === "movingLeft" ? this.x += this.gamespeed * this.speed * this.direction + 2 : this.x += this.gamespeed * this.speed * this.direction;
        this.drawChar();
    }
    drawChar() {
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.frames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
        this.ctx.drawImage(this.sprite, this.width * this.frameIndex, 0, this.width, this.height, this.x, this.y, this.width * this.coef, this.height * this.coef);
    }
}

export { Character };