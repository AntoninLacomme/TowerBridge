
class MapLevelOne extends Map {

    constructor () {
        super ();
        this.nbLines = 50;
        this.nbColumns = 30;
        this.dataMap = this.createGrassDataMap (this.nbColumns, this.nbLines);
        for (let i = 0; i<this.dataMap[0].length; i++) {
            this.dataMap[0][i] = new CelluleStone (i, 0);
        }
    }
}
