
class TurretTest extends Turret {

    constructor (x, y) {
        super (x, y);
        this.name = "Tourelle test";

        this.cost = 100;
    }

    drawTurret (ctx) {
        ctx.save ();
        let maxRadius = SIDEWIDTHCELLULE / 2 - 5;

        // dessin du socle de base
        ctx.fillStyle = "purple";
        ctx.beginPath ();
        ctx.arc (0, 0, maxRadius, Math.PI * 2, 0);
        ctx.closePath ();
        ctx.fill ();

        ctx.fillStyle = "black";
        ctx.beginPath ();
        ctx.arc (0, 0, SIDEWIDTHCELLULE / 3, Math.PI * 2, 0);
        ctx.closePath ();
        ctx.fill ();

        ctx.fillStyle = "purple";
        ctx.beginPath ();
        ctx.arc (0, 0, SIDEWIDTHCELLULE / 6, Math.PI * 2, 0);
        ctx.closePath ();
        ctx.fill ();

        ctx.restore ();
    }
}
