class Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    this.name = name;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.offset = {
      x: null,
      y: null
    };
    this.perfX = perfX;
    this.perfY = perfY;
    this.shadow = shadow;
    this.inPlace = false;
    this.isMoving = false;
    this.isSelected = false;
  }
  draw() {
    if (this.isSelected === true) this.drawShadow();

    if (this.isMoving === true) {
      this.ctx.shadowBlur = 10;
      this.ctx.shadowOffsetX = 20;
      this.ctx.shadowColor = "rgba(0,0,0,1)";
    }
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = "transparent"
  }
  isClose() {
    var distance = this.distance({
      x: this.x,
      y: this.y
    }, {
      x: this.perfX,
      y: this.perfY
    })
    if (distance < this.width / 3 || distance < this.height / 3) {
      this.x = this.perfX;
      this.y = this.perfY;
      this.inPlace = true;
    } else if (distance === undefined) {
      this.inPlace = false;
    } else {
      this.inPlace = false;
    }
  }
  distance(obj1, obj2) {
    return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) +
      (obj1.y - obj2.y) * (obj1.y - obj2.y))
  }
  drawShadow() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.17)";
    this.ctx.arc(this.shadow.x, this.shadow.y, this.shadow.r, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }
}


export {
  Tool
};
