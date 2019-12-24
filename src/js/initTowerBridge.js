
window.onload = initialize;

function initialize () {
    canvas = document.createElement ("canvas");
    canvas.id = "canvasFullBackground";
    ctx = canvas.getContext ("2d");
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
