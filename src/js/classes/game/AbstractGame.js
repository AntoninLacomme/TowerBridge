
class Game {

    constructor () {
        if (this.constructor === Game) {
            throw new TypeError("La classe Game est classe abstraite !");
        }

        // variable comptant le nombre de frames passées
        this.timerFrame = 0;
        this.mouse = {x: null, y: null};

        // la map
        this.map = null;
    }

    mouseMoveOn (event) {
        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;

        this.map.setActualCelluleFocus (this.mouse.x, this.mouse.y);
    }

    // fonction appelée à chaque frames
    // fait "vivre" le jeu
    run (ctx) {
        this.timerFrame++;
        this.map.drawCellules (ctx);
    }
}
