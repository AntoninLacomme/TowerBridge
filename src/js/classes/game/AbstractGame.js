
class Game {

    constructor () {
        if (this.constructor === Game) {
            throw new TypeError("La classe Game est classe abstraite !");
        }
        // création des éléments DOM
        try { document.querySelector ("#divMainMenu").remove (); }
        catch (e) { }
        WIDTHMENU = 300;
        divMenu = document.createElement ("div");
        divMenu.id = "divMainMenu";
        divMenu.style.width = WIDTHMENU + "px";
        divMenu.style.height = canvas.height + "px";

        let menuEchap = document.createElement ("div");
        menuEchap.innerHTML = "PAUSE";
        menuEchap.onclick = (event) => { this.activateMenuGame (); }
        menuEchap.className = "buttonTowerBridge";
        divMenu.appendChild (menuEchap);
        document.body.appendChild (divMenu);

        // variable comptant le nombre de frames passées
        this.timerFrame = 0;
        this.mouse = {x: null, y: null};
        this.onscroll = false;

        // création d'une event onkeyup lié à cette game
        document.onkeyup = (event) => { this.bindingKeyEvent (event) };

        // la map
        this.map = null;
        this.pause = false;

        // les ressources
        this.actualMoney = 500;
        this.actualWood = 0;
        this.actualStone = 0;
        this.actualMana = 0;
        this.actualWorkers = 0;

        this.createDomElementRessources ();
    }

    bindingKeyEvent (event) {
        if (event.keyCode == 27) {
            this.activateMenuGame ();
        }
    }

    clicDown (event) {
        this.activeScroll ();
    }

    clicUp (event) {
        this.desactiveScroll ();
    }

    mouseMoveOn (event) {
        if (this.onscroll) {
            this.map.scroll (this.mouse.x - event.offsetX, this.mouse.y - event.offsetY);
            this.drawMap (ctx);
        }

        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;

        this.map.setActualCelluleFocus (this.mouse.x, this.mouse.y);
    }

    onclick (event) {
        this.map.userClick (event.offsetX, event.offsetY);
    }

    showMessage (x, y, message) {
        console.log(x, y, message);
    }

    addMoney (money) {
        this.actualMoney += money;
        this.actualizeMenu ();
    }

    recruteWorker (celluleTown) {
        if (this.actualMoney >= COSTRECRUTEMENTWORKER) {
            if (celluleTown.ressource > 0) {
                this.actualMoney += -1 * COSTRECRUTEMENTWORKER;
                this.actualWorkers += 1;
                celluleTown.ressource -= 1;

                //this.actualizeMenu ();
                this.updateGold ();
                this.updateWorkers ();
                return true;
            }
        }
        return false;
    }

    actualizeMenu () {
        let listRessources = [{name: "Or", classe: "gold", value: this.actualMoney},
                              {name: "Bois", classe: "wood", value: this.actualWood},
                              {name: "Pierre", classe: "stone", value: this.actualStone},
                              {name: "Mana", classe: "mana", value: this.actualMana},
                              {name: "Travailleurs", classe: "worker", value: this.actualWorkers}];

        listRessources.forEach ((ressource) => {
            document.querySelector(".ressource-" + ressource.classe).innerHTML = ressource.value;
        });

    }



    activeScroll () {
        this.onscroll = true;
    }

    desactiveScroll () {
        this.onscroll = false;
    }

    calculDiameters () {
        this.map.calculDiameters ();
    }

    // fonction d'affichage du menu echap
    activateMenuGame () {
        this.pause = !this.pause;
        try { document.querySelector ("div#divPause").remove (); }
        catch (e) { }

        // si on est en pause, création d'une div recouvrant tout
        if (this.pause) {
            let ecranPause = document.createElement ("div");
            ecranPause.id = "divPause";
            ecranPause.style.width = window.innerWidth + "px";
            ecranPause.style.height = window.innerHeight + "px";

            // bouton resume
            let buttonResume = document.createElement ("div");
            buttonResume.innerHTML = "RESUME";
            buttonResume.className = "buttonTowerBridge";
            buttonResume.onclick = () => { this.activateMenuGame (); }

            ecranPause.appendChild (buttonResume);

            document.body.appendChild (ecranPause);
        }
    }

    createDomElementRessources () {
        let divRessources = document.createElement ("div");
        let table = document.createElement ("table");
        /*table.style.position = "absolute";
        table.style.left = (window.innerWidth - WIDTHMENU) + "px";
        table.style.top = "50px";*/
        table.style.paddingLeft = "10px";
        table.className = "ressources";
        let listRessources = [{name: "Or", classe: "gold", value: this.actualMoney},
                              {name: "Bois", classe: "wood", value: this.actualWood},
                              {name: "Pierre", classe: "stone", value: this.actualStone},
                              {name: "Mana", classe: "mana", value: this.actualMana},
                              {name: "Travailleurs", classe: "worker", value: this.actualWorkers}];

        listRessources.forEach ((ressource) => {
            let tr = document.createElement ("tr");
            let nameRessource = document.createElement ("td");
            let valueRessource = document.createElement ("td");

            nameRessource.innerHTML = ressource.name;
            valueRessource.innerHTML = ressource.value;

            valueRessource.className = "ressource-" + ressource.classe;

            tr.appendChild (nameRessource);
            tr.appendChild (valueRessource);
            table.appendChild (tr);
        });
        document.querySelector("#divMainMenu").appendChild (table);
    }

    updateGold () {
        document.querySelector (".ressource-gold").innerHTML = this.actualMoney;
    }

    updateWorkers () {
        document.querySelector (".ressource-worker").innerHTML = this.actualWorkers;
    }

    // fonction appelée à chaque frames
    // fait "vivre" le jeu
    run (ctx) {
        if (!this.pause) {
            this.timerFrame++;
            // activation des effets de toutes les cellules de la carte
            this.map.activateEffectsCellules ();

            // dessin
            this.map.drawActualCellFocus (ctx);
            this.map.drawAllTurrets (ctxAnim);
        }
    }

    drawMap (ctx) {
        this.map.drawCellules (ctx);
    }
}
