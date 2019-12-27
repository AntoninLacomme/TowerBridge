
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

    // fonction appelée à chaque frames
    // fait "vivre" le jeu
    run (ctx) {
        if (!this.pause) {
            this.timerFrame++;
            this.map.drawActualCellFocus (ctx);
        }
    }

    drawMap (ctx) {
        this.map.drawCellules (ctx);
    }
}
