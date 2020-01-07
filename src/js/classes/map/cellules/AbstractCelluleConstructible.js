
class CelluleConstructible extends Cellule {

    constructor (x, y) {
        super (x, y);
        if (this.constructor === CelluleConstructible) {
            throw new TypeError("La classe CelluleConstructible est classe abstraite !");
        }
        this.turret = null;
    }

    addTurret (turret) {
        this.turret = turret;
    }

    showInformations () {
        super.showInformations ();
        //this.inf.addTurret ();
    }

    drawBackgroundTurret (ctx) {
        if (this.turret != null) {
            ctx.save ();
            ctx.translate (this.posx, this.posy);
            console.log(ctx, this.turret);
            this.turret.drawTurret (ctx);
            ctx.restore ();
        }
    }
}
