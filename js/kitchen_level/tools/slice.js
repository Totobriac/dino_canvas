var onionPeeledSprite = new Image();
onionPeeledSprite.src = "../assets/kitchen_level/onion_peeled.png";

import { onion } from "../tools.js";


function drawSlice(ctx) {
    if (onion.state === "beheaded") {

        var coef = 0.65;

        var x = canvas.width / 2;
        var y = canvas.height / 2;
    
        ctx.save();
        ctx.translate(x, y);
    
        ctx.rotate((Math.PI / 180) * onion.angle);
    
        var xOffset = -(548 * coef) / 2;
        var yOffset = -(600 * coef) / 2;
    
    
        let tempCanvas = document.createElement("canvas");
        let tempContext = tempCanvas.getContext("2d");
        tempCanvas.width = 1200;
        tempCanvas.height = 400;
    
    
        tempContext.beginPath();
    
        tempContext.moveTo(96, 120);
        tempContext.lineTo(256, 120);
    
        tempContext.arc(-xOffset, -yOffset, 110, 7 * Math.PI / 4, Math.PI / 3, false);
        tempContext.arc(-xOffset, -yOffset, 110, 2 * Math.PI / 3, 5 * Math.PI / 4, false);
    
    
        tempContext.closePath();
    
    
        tempContext.fill();
    
    
        tempContext.globalCompositeOperation = "source-in";
    
    
        tempContext.drawImage(onionPeeledSprite, 0, 0, 548 * coef, 600 * coef);
    
        ctx.drawImage(tempCanvas, xOffset, yOffset, 1200, 400);
    
        ctx.restore();
    
    }
}

export { drawSlice }
