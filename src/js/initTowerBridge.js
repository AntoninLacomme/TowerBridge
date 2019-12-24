
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasAnimation.width = window.innerWidth;
    canvasAnimation.height = window.innerHeight;

    canvasEvents.width = window.innerWidth;
    canvasEvents.height = window.innerHeight;

    game.drawMap (ctx);
}

function run () {
    game.run (ctxAnim);

    requestAnimationFrame (run);
}
