
class CelluleMineGold extends CelluleRessource {

    constructor (x, y) {
        super (x, y);
        this.ressource = 1000;

        this.title = "Mine d'or";
    }

    showInformations () {
        super.showInformations ();
    }

    effectCellule () {
        super.effectCellule ();
    }

    drawBackground (ctx) {
        ctx.save ();
        ctx.fillStyle = "gold";
        ctx.beginPath ();
        LISTPOINTS.forEach((value, index) => {
            if (index == 0) { ctx.moveTo (value.x, value.y); }
            ctx.lineTo (value.x, value.y);
        });
        ctx.closePath ();
        ctx.fill ();
        ctx.stroke ();
        ctx.restore ();
    }
}
