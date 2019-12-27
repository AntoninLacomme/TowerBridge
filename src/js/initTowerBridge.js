
window.onload = initialize;
window.onresize = resizeAll;

function initialize () {
    canvas = document.createElement ("canvas");
    canvas.id = "canvasFullBackground";
    ctx = canvas.getContext ("2d");

    canvasAnimation = document.createElement ("canvas");
    canvasAnimation.id = "canvasFullAnimation";
    ctxAnim = canvasAnimation.getContext ("2d");

    canvasEvents = document.createElement ("canvas");
    canvasEvents.id = "canvasFullBackgroundEvents";

    canvasEvents.onmousemove = function (event) { game.mouseMoveOn (event); }
    canvasEvents.onmousedown = function (event) { game.clicDown (); }
    canvasEvents.onmouseup = function (event) { game.clicUp (); }
    document.body.appendChild (canvas);
    document.body.appendChild (canvasAnimation);
    document.body.appendChild (canvasEvents);

    game = new GameLevelOne ();
    resizeAll ();
    run ();
}

function resizeAll () {
    canvas.width = window.innerWidth - WIDTHMENU;
    canvas.height = window.innerHeight;

    canvasAnimation.width = canvas.width;
    canvasAnimation.height = canvas.height;

    canvasEvents.width = canvas.width;
    canvasEvents.height = canvas.height;

    divMenu.style.height = canvas.height + "px";

    game.calculDiameters ();
    game.drawMap (ctx);
}

function run () {
    game.run (ctxAnim);

    requestAnimationFrame (run);
}
