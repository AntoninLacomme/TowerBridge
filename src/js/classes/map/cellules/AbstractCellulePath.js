
class CellulePath extends Cellule {

    constructor () {
        super ();

        this.listCellsPathNext = [];
    }

    addCelluleNext (cellule) {
        this.listCellsPathNext.push (cellule);
    }
}
