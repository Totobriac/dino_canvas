import { Tool } from "./tool.js";

var steps = ["Remplir la casserole d'eau", "Ajouter du sel", "Allumer le feu en haut à droite",
  "Y mettre la casserole", "Ajouter du beurre à la poele", "Allumer le feu du milieu", "Y placer la poele",
  "Hacher l'oignon","Presser l'ail", "Raper la carotte","Remuer et faire suer","Ajouter la viande, l'égrenner",
  "Ajouter les pâtes à la casserole", "Faire revenir la viande", "Ouvrir la boite de sauce tomate","L'ajouter à la préparation",
  "Egouter les pâtes", "Les ajouter à la sauce"
]


class Notepad extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.big = false;
    this.stepDone = 20;
    this.lines = this.createLines();
  }
  draw() { 
    if (this.isSelected) {
      this.makeItBig();
    };

    if (this.big) {
      this.width = 466;
      this.height = 600;
      this.x = 367;
      super.draw();
      this.ctx.fillStyle = "black";
      this.ctx.font = "30px Cooking";
      steps.forEach((step, i) => {
        this.ctx.fillText(step, this.x + 60, this.y + 54 + i *25);
      });
      for (let i = 0; i < this.stepDone - 2; i ++) {
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = this.lines[i].width;
        this.ctx.filter = "url(#turb0)";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 60, this.y + 44 + i *25 + this.lines[i].leftY);
        this.ctx.lineTo(this.x + this.lines[i].length, this.y + 44 + i *25 + this.lines[i].rightY)
        this.ctx.stroke();
        this.ctx.filter = "none";
      } 
    }
    else {
      this.width = 69;
      this.height = 90;
      this.x = 296;
      this.y = 60;
      super.draw();
    };
  }
  makeItBig() {
    this.big = true;
  }
  reset(x, y) {
    if (x < 367 || x > 833 || y < this.y || y > this.y + this.height) {
      this.big = false;
    }
  }
  createLines() {
    var lines = [];   
    for (let step of steps) {
      console.log(step.length);
      var line = {
        rightY : - 3 + Math.floor(Math.random() * 6),
        leftY : - 2 + Math.floor(Math.random() * 4),
        width : 1 + Math.floor(Math.random() * 2),
        length : step.length * 12,
      }
      lines.push(line);
    }
    return lines
  };
}

export { Notepad };
