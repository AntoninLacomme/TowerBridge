
class CellulePath extends Cellule {

    constructor (x, y) {
        super (x, y);

        this.listCellsPathPassed = [];
        this.listCellsPathNext = [];
    }

    addCellulePassed (tuple) {
        this.listCellsPathPassed.push (tuple);
    }

    addCelluleNext (tuple) {
        this.listCellsPathNext.push (tuple);
    }

    containsPassed (n, m) {
        for (let i=0; i<this.listCellsPathPassed.length; i++) {
            if (this.listCellsPathPassed[i].x == n && this.listCellsPathPassed[i].y == m) {
                return true;
            }
        }
        return false;
    }

    containsNext (n, m) {
        for (let i=0; i<this.listCellsPathNext.length; i++) {
            if (this.listCellsPathNext[i].x == n && this.listCellsPathNext[i].y == m) {
                return true;
            }
        }
        return false;
    }
}
