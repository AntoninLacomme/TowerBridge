
class CelluleWood extends CelluleRessource {

    constructor (x, y) {
        super (x, y);
        this.ressource = 2000;

        this.title = "Forêt";
    }

    showInformations () {
        super.showInformations ();
    }

    effectCellule () {
        super.effectCellule ();
    }

    drawBackground (ctx) {
        ctx.save ();
        ctx.fillStyle = "limegreen";
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
