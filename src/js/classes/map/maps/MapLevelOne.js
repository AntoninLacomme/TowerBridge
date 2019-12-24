
class MapLevelOne extends Map {

    constructor () {
        super ();
        this.nbLines = 30;
        this.nbColumns = 50;
        this.dataMap = this.createGrassDataMap (this.nbColumns, this.nbLines);
    }
}
