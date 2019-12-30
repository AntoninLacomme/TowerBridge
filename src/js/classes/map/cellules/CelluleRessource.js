
class CelluleRessource extends Cellule {

    constructor (x, y) {
        super (x, y);

        this.maxWorker = 3;
        this.actualWorker = 0;

        this.maxTimeRecolte = 100;
        this.actualTimeRecolte = 0;
    }

    update () {
        this.inf.setInformationsRessource (this.actualWorker, this.ressource);
    }

    showInformations () {
        this.inf = new Information ();
        this.inf.setTitle (this.title);
        this.inf.setCoords (this.coordx, this.coordy);
        this.inf.setInformationsRessource (this.actualWorker, this.ressource);
    }

    addWorker () {
        this.actualWorker++;
        if (this.actualWorker > this.maxWorker) {
            this.actualWorker = this.maxWorker;
            return false;
        }
        return true;
    }

    effectCellule () {
        if (this.ressource > 0) {
            if (this.actualTimeRecolte <= 0) {
                let money = this.actualWorker * GOLDBYWORKERINMINE;
                if (money > 0) {
                    if (money > this.ressource) { money = this.ressource; }
                    this.ressource -= money;
                    game.addMoney (money);
                    game.showMessage (this.posx, this.posy, "+ " + money + " golds");
                }
                this.actualTimeRecolte = this.maxTimeRecolte;
            }

        this.actualTimeRecolte--;
        }
    }

    drawEffectActive (ctx) {
        ctx.save ();
        ctx.lineWidth = 5;
        ctx.beginPath ();
        ctx.arc (0, 0, RADIUSCELLULE * 1.3, 0, Math.PI * 2, false);
        ctx.closePath ();
        ctx.stroke ();
        ctx.restore ();

        this.drawTitle (ctx);
        this.drawWorkers (ctx);
        this.drawRessource (ctx);
    }

    drawBackgroundTitle (ctx, x, y, width, height) {
        ctx.save ();
        ctx.fillStyle = "gold";
        ctx.fillRect (x, y, width, height);
        ctx.strokeRect (x + 2, y + 2 , width - 4, height - 4);
        ctx.restore ();
    }

    drawTitle (ctx) {
        ctx.save ();
        ctx.textAlign = "center";
        this.drawBackgroundTitle (ctx, -RADIUSCELLULE, -RADIUSCELLULE * 1.6, 2 * RADIUSCELLULE, 2 * RADIUSCELLULE / 3);

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText (this.title, 0, -RADIUSCELLULE * 1.6 + RADIUSCELLULE / 3 + 6);
        ctx.restore ();
    }

    drawWorkers (ctx) {
        ctx.save ();
        // draw exploitants
        ctx.fillStyle = "gold";
        ctx.textAlign = "center";
        this.drawBackgroundTitle (ctx, -RADIUSCELLULE - 25, RADIUSCELLULE * 1.6 - RADIUSCELLULE / 3 - 25, 50, 30);

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText (this.actualWorker, -RADIUSCELLULE, RADIUSCELLULE * 1.6 - RADIUSCELLULE / 3 - 6);
        ctx.restore ();
    }

    drawRessource (ctx) {
        ctx.save ();
        // draw qte ressource restante
        ctx.fillStyle = "gold";
        ctx.textAlign = "center";
        this.drawBackgroundTitle (ctx, RADIUSCELLULE - 25, RADIUSCELLULE * 1.6 - RADIUSCELLULE / 3 - 25, 50, 30);

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText (this.ressource, RADIUSCELLULE, RADIUSCELLULE * 1.6 - RADIUSCELLULE / 3 - 6);

        ctx.restore ();
    }
}
