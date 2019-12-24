
class Game {

    constructor () {
        if (this.constructor === Game) {
            throw new TypeError("La classe Game est classe abstraite !");
        }

        // variable comptant le nombre de frames passées
        this.timerFrame = 0;
        this.mouse = {x: null, y: null};
        this.onscroll = false;

        // la map
        this.map = null;
    }

    clicDown (event) {
        this.activeScroll ();
    }

    clicUp (event) {
        this.desactiveScroll ();
        this.drawMap (ctx);
    }

    mouseMoveOn (event) {
        if (this.onscroll) {
            this.map.scroll (this.mouse.x - event.offsetX, this.mouse.y - event.offsetY);
            this.drawMap (ctx);
        }

        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;

        this.map.setActualCelluleFocus (this.mouse.x, this.mouse.y);
    }



    activeScroll () {
        this.onscroll = true;
    }

    desactiveScroll () {
        this.onscroll = false;
    }

    // fonction appelée à chaque frames
    // fait "vivre" le jeu
    run (ctx) {
        this.timerFrame++;
        this.map.drawActualCellFocus (ctx);
    }

    drawMap (ctx) {
        this.map.drawCellules (ctx);
    }
}
