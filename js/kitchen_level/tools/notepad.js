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
}

export { Notepad };
