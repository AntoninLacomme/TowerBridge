
class MapLevelOne extends Map {

    constructor () {
        super ();
        this.nbLines = 50;
        this.nbColumns = 30;
        this.dataMap = this.createGrassDataMap (this.nbColumns, this.nbLines);
        for (let i = 0; i<this.dataMap[0].length; i++) {
            this.dataMap[0][i] = new CelluleStone (i, 0);
        }

        this.dataMap[2][2] = new CelluleMineGold (2, 2);

        for (let i=3; i<8; i++) {
            for (let j=6; j<11; j++) {
                this.dataMap[i][j] = new CelluleWood (j, i);
            }
        }
    }
}
