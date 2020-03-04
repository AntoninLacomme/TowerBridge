
class Turret {
    constructor (x, y) {
        if (this.constructor === Turret) {
            throw new TypeError("La classe Turret est classe abstraite !");
        }


        this.name = "Tourelle sans nom";

        this.coordx = x;
        this.coordy = y;

        this.nbWorkers = 0;

        this.cost = 0;        // coût de la tourelle

        this.range = 0;       // range de la tourelle
        this.power = 0;       // puissance de la tourelle
    }

    drawTurret (ctx) { }
}
