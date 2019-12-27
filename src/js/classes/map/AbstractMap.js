
class Map {

    constructor () {
        if (this.constructor === Map) {
            throw new TypeError("La classe Map est classe abstraite !");
        }

        this.dataMap = [];
        this.ancre = {x: 0, y: 0}

        this.actualCelluleFocus = null;
    }

    calculDiameters () {
        let lastCell = (this.dataMap[this.dataMap.length - 1][this.dataMap[this.dataMap.length - 1].length - 1]);
        this.limHeight = lastCell.posy + 3 * RADIUSCELLULE - canvas.height;
        this.linWidth = lastCell.posx + 3 * RADIUSCELLULE - canvas.width;
    }

    scroll (n, m) {
        this.ancre.x += n;
        this.ancre.y += m;

        if (this.ancre.x < -RADIUSCELLULE) { this.ancre.x = -RADIUSCELLULE; }
        else if (this.ancre.x > this.linWidth) { this.ancre.x = this.linWidth; }
        if (this.ancre.y < -SIDEHEIGHTCELLULE / 2) { this.ancre.y = -SIDEHEIGHTCELLULE / 2; }
        else if (this.ancre.y > this.limHeight) { this.ancre.y = this.limHeight; }
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
            let accn = this.ancre.x + n;
            let accm = this.ancre.y + m;
            let temp = [];
            for (let y = 0; y < this.dataMap.length; y++) {
                for (let x = 0; x < this.dataMap[y].length; x++) {
                    if (this.dataMap[y][x].isRectContains (accn, accm)) {
                        temp.push (this.dataMap[y][x]);
                    }
                }
            }
            if (temp.length == 1) { this.setFocusCell (temp[0]); return; }
            if (temp.length == 2) {
                let dist0 = Math.sqrt(Math.pow(accn - temp[0].posx, 2) + Math.pow(accm - temp[0].posy, 2));
                let dist1 = Math.sqrt(Math.pow(accn - temp[1].posx, 2) + Math.pow(accm - temp[1].posy, 2));
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

    // retourne une matrice(x, y) dataMap de Cellules Grass
    createGrassDataMap (x, y) {
        let matrice = [];
        let line;
        for (let j=0; j<y; j++) {
            line = [];
            for (let i=0; i<x; i++) {
                line.push(new CelluleGrass (i, j));
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

    drawActualCellFocus (ctx) {
        ctx.save ();
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        ctx.translate (-this.ancre.x, -this.ancre.y);
        try {
            this.actualCelluleFocus.drawCellule (ctx);
        }
        catch (e) { }

        ctx.restore ();
    }
}
