
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

        // liste contenant toutes les cellules de chemin
        let path = [{x: 5, y: 3}, {x: 5, y: 4}, {x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}, {x: 6, y: 8}, {x: 7, y: 8}, {x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6}];

        path.forEach ((tuple) => {
            this.dataMap[tuple.y][tuple.x] = new CellulePathSand (tuple.x, tuple.y);
        });

        this.listCellulesStart = [{x: 5, y: 3}, {x: 2, y: 6}];
        this.listCellulesEnd = [{x: 7, y: 8}];
        this.setUpCellulesPathStart (this.listCellulesStart, path);
        this.setUpCellulesPathEnd (this.listCellulesEnd, path);

        console.log(this.getCellule (5, 6));
    }
}
