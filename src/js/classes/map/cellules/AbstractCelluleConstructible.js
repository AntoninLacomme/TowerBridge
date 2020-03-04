
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

    placeClassTurret (classTurret) {
        let turret = new classTurret (this.coordx, this.coordy);

        if (game.actualMoney >= turret.cost) {
            game.addMoney (-1 * turret.cost);
            
            this.addTurret (new classTurret (this.coordx, this.coordy));
        }
    }

    showInformations () {
        super.showInformations ();

        if (this.turret == null) {
            this.inf.addTableTurret (this, [TurretTest]);
        }
        else {
            this.inf.addTurretInformations (this.turret);
        }
    }

    drawBackgroundTurret (ctx) {
        if (this.turret != null) {
            ctx.save ();
            ctx.translate (this.posx, this.posy);
            this.turret.drawTurret (ctx);
            ctx.restore ();
        }
    }
}
