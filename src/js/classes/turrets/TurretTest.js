
class TurretTest extends Turret {

    constructor () {
        super ();
    }

    drawTurret (ctx) {
        ctx.save ();
        ctx.arc (0, 0, SIDEWIDTHCELLULE, Math.PI * 2, 0);
        ctx.fill ();
        ctx.restore ();
    }
}
