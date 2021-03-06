
class CellulePathSand extends CellulePath {

    constructor (x, y) {
        super (x, y);
    }

    drawBackground (ctx) {
        ctx.save ();
        ctx.fillStyle = "orange";
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
