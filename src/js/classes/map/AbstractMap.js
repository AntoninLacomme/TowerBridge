
class Map {

    constructor () {
        if (this.constructor === Map) {
            throw new TypeError("La classe Map est classe abstraite !");
        }

        this.dataMap = [];

        this.actualCelluleFocus = null;
    }

    setFocusCell (cellule) {
        try { this.actualCelluleFocus.desactiveFocus (); }
        catch (e) { }

        this.actualCelluleFocus = cellule;
        try { this.actualCelluleFocus.activeFocus (); }
        catch (e) { }
    }

    setActualCelluleFocus (n, m) {
        if (this.actualCelluleFocus == null || !this.actualCelluleFocus.contains (n, m)) {
            for (let y = 0; y < this.dataMap.length; y++) {
                for (let x = 0; x < this.dataMap[y].length; x++) {
                    if (this.dataMap[y][x].contains (n, m)) {
                        this.setFocusCell (this.dataMap[y][x]);
                        return;
                    }
                }
            }

            this.setFocusCell (null);
        }
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
        this.dataMap.forEach ((line) => {
            line.forEach ((cellule) => {
                cellule.drawCellule (ctx);
            });
        });
    }
}
