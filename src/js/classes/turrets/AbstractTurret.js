
class Turret {
    constructor () {
        if (this.constructor === Turret) {
            throw new TypeError("La classe Turret est classe abstraite !");
        }


        this.range = 0;       // range de la tourelle
        this.power = 0;       // puissance de la tourelle
    }

    drawTurret (ctx) {
        ctx.save ();
        ctx.restore ();
    }
}
