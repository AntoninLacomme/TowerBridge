
class Map {

    constructor () {
        if (this.constructor === Map) {
            throw new TypeError("La classe Map est classe abstraite !");
        }

        this.dataMap = [];
        this.ancre = {x: 0, y: 0}

        this.actualCelluleFocus = null;
        this.actualCelluleCliqued = null;
    }

    getCellule (x, y) {
        return this.dataMap[y][x];
    }

    activateEffectsCellules () {
        this.dataMap.forEach((line) => {
            line.forEach((cellule) => {
                cellule.effectCellule ();
            });
        });
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

    userClick (n, m) {
        try {
            if (this.actualCelluleCliqued.coordx == this.actualCelluleFocus.coordx &&
                this.actualCelluleCliqued.coordy == this.actualCelluleFocus.coordy) {
                this.actualCelluleCliqued = null;
                destroyInformations ();
                return;
            }
        }
        catch (e) { }
        if (this.actualCelluleFocus != null && this.actualCelluleFocus.isRectContains (this.ancre.x + n, this.ancre.y + m)) {
            this.actualCelluleCliqued = this.actualCelluleFocus;
            this.actualCelluleCliqued.showInformations ();
            return;
        }
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

    setUpCellulesPathStart (listStarts, path) {
        for (let i=0; i<listStarts.length; i++) {
            let base = this.getCellule (listStarts[i].x, listStarts[i].y);
            let cells = [];
            path.forEach ((tuple) => {
                base.getAllAdjacents ().forEach ((tupleAdj) => {
                    if (tuple.x == tupleAdj.x && tuple.y == tupleAdj.y) {
                        if (!base.containsPassed (tupleAdj.x, tupleAdj.y)) {
                            cells.push(tuple);
                        }
                    }
                });
            });

            if (cells.length == 1) {
                base.addCelluleNext (cells[0]);
                this.getCellule (cells[0].x, cells[0].y).addCellulePassed (listStarts[i]);
                this.setUpCellulesPathStart (cells, path);
            }

            // if (cells.length <= 1) { console.log(base); }
        }
    }

    setUpCellulesPathEnd (listEnds, path) {
        for (let i=0; i<listEnds.length; i++) {
            let base = this.getCellule (listEnds[i].x, listEnds[i].y);
            if (base.listCellsPathPassed.length > 0) { return; }

            let cells = [];
            path.forEach ((tuple) => {
                base.getAllAdjacents ().forEach ((tupleAdj) => {
                    if (tuple.x == tupleAdj.x && tuple.y == tupleAdj.y) {
                        if (!base.containsNext (tupleAdj.x, tupleAdj.y)) {
                            cells.push(tuple);
                        }
                    }
                });
            });
            if (cells.length == 1) {
                base.addCellulePassed (cells[0]);
                this.getCellule (cells[0].x, cells[0].y).addCelluleNext (listEnds[i]);
                this.setUpCellulesPathEnd (cells, path);
            }

            if (cells.length <= 1) { console.log(base); }
        }
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

    drawAllTurrets (ctx) {
        ctx.save ();
        ctx.translate (-this.ancre.x, -this.ancre.y);
        this.dataMap.forEach ((line) => {
            line.forEach ((cellule) => {
                ctx.save ();
                cellule.drawBackgroundTurret (ctx);
                ctx.restore ();
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
