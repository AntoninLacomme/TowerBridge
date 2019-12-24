
window.onload = initialize;
window.onresize = resizeAll;

function initialize () {
    canvas = document.createElement ("canvas");
    canvas.id = "canvasFullBackground";
    ctx = canvas.getContext ("2d");

    canvas.onmousemove = function (event) { game.mouseMoveOn (event); }
    document.body.appendChild (canvas);

    game = new GameLevelOne ();

    resizeAll ();
    run ();
}

function resizeAll () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function run () {
    game.run (ctx);

    requestAnimationFrame (run);
}
