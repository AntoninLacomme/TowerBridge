
class Cellule {

    constructor (x, y) {
        if (this.constructor === Cellule) {
            throw new TypeError("La classe Cellule est classe abstraite !");
        }

        this.coordx = x;
        this.coordy = y;

        this.posx = MARGE + this.coordx * SIDEWIDTHCELLULE;
        this.posy = MARGE + this.coordy * SIDEHEIGHTCELLULE + (this.coordy * (RADIUSCELLULE - SIDEHEIGHTCELLULE) / 2);

        if (this.coordy % 2 == 1) {
            this.posx += SIDEWIDTHCELLULE / 2;
        }

        this.isFocus = false;
    }

    showInformations () {
        this.inf = new Information ();
        this.inf.setTitle (this.title);
        this.inf.setCoords (this.coordx, this.coordy);
    }

    effectCellule () {
        // do nothing
    }

    activeFocus () {
        this.isFocus = true;
    }

    desactiveFocus () {
        this.isFocus = false;
    }

    getAdjacentLeft () {
        return {x: this.coordx - 1, y: this.coordy};
    }

    getAdjacentRight () {
        return {x: this.coordx + 1, y: this.coordy};
    }

    getAdjacentTopLeft () {
        let acc = 0;
        if (this.coordy % 2 == 1) { acc = 1; }
        return {x: this.coordx - 1 + acc, y: this.coordy - 1  }
    }

    getAdjacentTopRight () {
        let acc = 0;
        if (this.coordy % 2 == 1) { acc = 1; }
        return {x: this.coordx + acc, y: this.coordy -1 }
    }

    getAdjacentDownLeft () {
        let acc = 0;
        if (this.coordy % 2 == 1) { acc = 1; }
        return {x: this.coordx - 1 + acc, y: this.coordy + 1  }
    }

    getAdjacentDownRight () {
        let acc = 0;
        if (this.coordy % 2 == 1) { acc = 1; }
        return {x: this.coordx + acc, y: this.coordy + 1 }
    }

    getAllAdjacents () {
        return [
          this.getAdjacentLeft (),
          this.getAdjacentRight (),
          this.getAdjacentTopLeft (),
          this.getAdjacentTopRight (),
          this.getAdjacentDownLeft (),
          this.getAdjacentDownRight ()
        ];
    }

    isRectContains (x, y) {
        if ((x > this.posx + LISTPOINTS[2].x) && (x < this.posx + LISTPOINTS[4].x)) {
            if ((y > this.posy + LISTPOINTS[3].y) && (y < this.posy + LISTPOINTS[0].y)) {
                return true;
            }
        }
        return false;
    }

    drawCellule (ctx) {
        ctx.save ();
        ctx.translate (this.posx, this.posy);
        this.drawBackground (ctx);
        if (ctx.canvas != canvas && this.isFocus) {
            ctx.save ();
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "ivory";
            ctx.beginPath ();
            LISTPOINTS.forEach((value, index) => {
                if (index == 0) { ctx.moveTo (value.x, value.y); }
                ctx.lineTo (value.x, value.y);
            });
            ctx.closePath ();
            ctx.fill ();
            ctx.restore ();

            this.drawEffectActive (ctx);
        }
        ctx.restore ();
    }

    drawBackground (ctx) {
        ctx.save ();
        ctx.fillStyle = "purple";
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

    drawBackgroundTurret (ctx) { }

    drawEffectActive (ctx) {
        // do nothing
    }
}
