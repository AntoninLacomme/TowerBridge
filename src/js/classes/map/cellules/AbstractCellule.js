
class Cellule {

    constructor (x, y) {
        if (this.constructor === Cellule) {
            throw new TypeError("La classe Cellule est classe abstraite !");
        }

        this.coordx = x;
        this.coordy = y;

        this.posx = MARGE + this.coordx * WIDTHCELLULE;
        this.posy = MARGE + this.coordy * WIDTHCELLULE;

        this.isFocus = false;
    }

    activeFocus () {
        this.isFocus = true;
    }

    desactiveFocus () {
        this.isFocus = false;
    }

    contains (x, y) {
        if (x >= this.posx && x < this.posx + WIDTHCELLULE) {
            if (y >= this.posy && y < this.posy + WIDTHCELLULE) {
                return true;
            }
        }
        return false;
    }

    drawCellule (ctx) {
        ctx.save ();
        ctx.translate (this.posx, this.posy);

        this.drawBackground (ctx);

        if (this.isFocus) {
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "ivory";
            ctx.fillRect (0, 0, WIDTHCELLULE, WIDTHCELLULE);
        }
        ctx.restore ();
    }

    drawBackground (ctx) {
        ctx.save ();
        ctx.fillStyle = "purple";
        ctx.fillRect (0, 0, WIDTHCELLULE, WIDTHCELLULE);
        ctx.restore ();
    }
}
