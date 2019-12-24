
class Map {

    constructor () {
        if (this.constructor === Map) {
            throw new TypeError("La classe Map est classe abstraite !");
        }

        this.dataMap = [];
        this.ancre = {x: 0, y: 0}

        this.actualCelluleFocus = null;
    }

    scroll (n, m) {
        this.ancre.x += n;
        this.ancre.y += m;
    }

    setFocusCell (cellule) {
        try { this.actualCelluleFocus.desactiveFocus (); }
        catch (e) { }

        this.actualCelluleFocus = cellule;
        try { this.actualCelluleFocus.activeFocus (); }
        catch (e) { }
    }

    setActualCelluleFocus (n, m) {
        try {
            let temp = [];
            for (let y = 0; y < this.dataMap.length; y++) {
                for (let x = 0; x < this.dataMap[y].length; x++) {
                    if (this.dataMap[y][x].isRectContains (n, m, this.ancre)) {
                        temp.push (this.dataMap[y][x]);
                    }
                }
            }
            if (temp.length == 1) { this.setFocusCell (temp[0]); return; }
            if (temp.length == 2) {
                let dist0 = Math.sqrt(Math.pow(n - temp[0].posx, 2) + Math.pow(m - temp[0].posy, 2));
                let dist1 = Math.sqrt(Math.pow(n - temp[1].posx, 2) + Math.pow(m - temp[1].posy, 2));
                if (dist0 > dist1) {
                    this.setFocusCell (temp[1]);
                }
                else {
                    this.setFocusCell (temp[0]);
                }
                return;
            }
            this.setFocusCell (null);
        }
        catch (e) { }
    }

    // retourne une matrice(x, y) dataMap de cellules vides
    createEmptyDataMap (x, y) {
        let matrice = [];
        let line;
        for (let j=0; j<y; j++) {
            line = [];
            for (let i=0; i<x; i++) {
                line.push(new CelluleEmpty (i, j));
            }
            matrice.push (line);
        }
        return matrice;
    }

    // dessine toutes les cellules constituant la map
    drawCellules (ctx) {
        ctx.save ();
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        ctx.translate (-this.ancre.x, -this.ancre.y);
        this.dataMap.forEach ((line) => {
            line.forEach ((cellule) => {
                cellule.drawCellule (ctx);
            });
        });
        ctx.restore ();
    }
}
