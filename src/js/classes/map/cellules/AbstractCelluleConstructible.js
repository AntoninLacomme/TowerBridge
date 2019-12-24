
class CelluleConstructible extends Cellule {

    constructor (x, y) {
        if (this.constructor === CelluleConstructible) {
            throw new TypeError("La classe CelluleConstructible est classe abstraite !");
        }
        this.turret = null;
    }
}
