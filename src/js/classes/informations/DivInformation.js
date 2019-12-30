
class Information {

    constructor () {
        destroyInformations ();

        this.main = document.createElement("div");
        this.main.id = "divInformation";
        this.main.style.height = window.innerHeight * 0.75 + "px";
        this.main.style.width = WIDTHMENU + "px";
        this.main.style.right = 0 + "px";

        this.main.style.backgroundColor = "rgb(130, 130, 130)";

        this.domTitle = document.createElement ("div");
        this.domTitle.style.textAlign = "center";

        this.domCoord = document.createElement ("table");
        this.domCoord.style.margin = "auto auto";
        let tr = document.createElement ("tr");
        let tdx = document.createElement ("td");
        let tdy = document.createElement ("td");
        this.domCoordX = document.createElement ("td");
        this.domCoordY = document.createElement ("td");
        tdx.innerHTML = "X :";
        tdy.innerHTML = "Y :";
        tr.appendChild (tdx);
        tr.appendChild (this.domCoordX);
        tr.appendChild (tdy);
        tr.appendChild (this.domCoordY);
        this.domCoord.appendChild (tr);


        this.addElementDom (this.domTitle);
        this.addElementDom (this.domCoord);
        document.body.appendChild (this.main);
    }

    setTitle (title) {
        this.domTitle.innerHTML = "<h2>" + title + "</h2>";
    }

    setCoords (x, y) {
        this.domCoordX.innerHTML = x;
        this.domCoordY.innerHTML = y;
    }

    setInformationsRessource (nbWorkers, qteRessource) {
        if (!this.hasOwnProperty("domNbWorkers") && !this.hasOwnProperty("domQteRessource")) {
            let table = document.createElement ("table");
            let tr1 = document.createElement ("tr");
            let tr2 = document.createElement ("tr");
            let tr1td1 = document.createElement ("td");
            let tr2td1 = document.createElement ("td");
            this.domNbWorkers = document.createElement ("td");
            this.domQteRessource = document.createElement ("td");
            tr1td1.innerHTML = "Nombre d'exploitants";
            tr2td1.innerHTML = "Ressource restante";

            tr1.appendChild (tr1td1);
            tr1.appendChild (this.domNbWorkers);
            tr2.appendChild (tr2td1);
            tr2.appendChild (this.domQteRessource);
            table.appendChild (tr1);
            table.appendChild (tr2);
            this.addElementDom (table);
        }

        this.domNbWorkers.innerHTML = nbWorkers;
        this.domQteRessource.innerHTML = qteRessource;
    }

    addElementDom (dom) {
        this.main.appendChild (dom);
    }
}

function destroyInformations () {
    try { document.querySelector ("#divInformation").remove (); }
    catch (e) { }
}
