
class Game {

    constructor () {
        if (this.constructor === Game) {
            throw new TypeError("La classe Game est classe abstraite !");
        }

        // variable comptant le nombre de frames passées
        this.timerFrame = 0;

        // la map
        this.map = null;
    }

    // fonction appelée à chaque frames
    // fait "vivre" le jeu
    run (ctx) {

    }
}
