var canvas, ctx;
var divMenu, divInformation;
var canvasAnimation, ctxAnim;
var game;
var RADIUSCELLULE = 40;
var MARGE = 60;
var SIDEHEIGHTCELLULE = (RADIUSCELLULE * 2 * Math.acos(Math.PI / 6)) | 0;
var SIDEWIDTHCELLULE = (RADIUSCELLULE * 2 * Math.sin((SIDEHEIGHTCELLULE / 2) / RADIUSCELLULE));
var SIDECOTE = RADIUSCELLULE * Math.asin (30 / RADIUSCELLULE);
var LISTPOINTS = calculListPoints ();
var WIDTHMENU = 0;



var GOLDBYWORKERINMINE = 10;


function calculListPoints () {
    let pts = [];
    let rotate = Math.PI / 2;
    for (let i=0; i<6; i++) {
        pts.push({x: (RADIUSCELLULE * Math.cos((2 * Math.PI * i / 6) + rotate)) | 0,
                  y: (RADIUSCELLULE * Math.sin((2 * Math.PI * i / 6) + rotate)) | 0});
    }
    return pts;
}
