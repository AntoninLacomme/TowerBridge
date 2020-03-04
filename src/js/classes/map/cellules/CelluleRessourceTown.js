
class CelluleTown extends CelluleRessource {

    constructor (x, y) {
        super (x, y);
        this.ressource = 3;

        this.title = "Village";
    }

    showInformations () {
        this.inf = new Information ();
        this.inf.setTitle (this.title);
        this.inf.setCoords (this.coordx, this.coordy);
        this.inf.setInformationsTown (this.ressource);
        this.inf.addButton ("Recruter un travailleur", "+",
                            () => {
                                if (game.recruteWorker (this)) {
                                    this.inf.setInformationsTown (this.ressource);
                                }
                            });
    }

    drawEffectActive (ctx) {
        ctx.save ();
        ctx.lineWidth = 5;
        ctx.beginPath ();
        ctx.arc (0, 0, RADIUSCELLULE * 1.3, 0, Math.PI * 2, false);
        ctx.closePath ();
        ctx.stroke ();
        ctx.restore ();

        this.drawTitle (ctx);
        this.drawRessource (ctx);
    }

    drawBackground (ctx) {
        ctx.save ();
        ctx.fillStyle = "red";
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
