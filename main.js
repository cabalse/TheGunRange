/*****************/
/* The Gun Range */
/*     2021      */
/*   Cabal_se    */
/*****************/

const CANVAS_WIDTH = 814;
const CANVAS_HEIGHT = 566;

class Game {
    constructor() {
        this.initCanvas();
        this.initEventListerners();
    }
    initCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.backgroundCanvas = document.createElement("canvas");
        this.backgroundCanvas.width = CANVAS_WIDTH;
        this.backgroundCanvas.height = CANVAS_HEIGHT;
        this.backgroundContext = this.backgroundCanvas.getContext("2d");
        document.body.insertBefore(this.backgroundCanvas, document.body.childNodes[0]);
    }
    initEventListerners() {
        this.canvas.addEventListener('click', playerClickedCanvas, false);
    }
    drawBackground() {
        let ctx = this.backgroundContext;

        const fullBlock = (x, y) => {
            ctx.drawImage(document.getElementById("background"), 0, 0, 127, 63, x, y, 127, 63)
        };

        const halfBlock = (x, y) => {
            ctx.drawImage(document.getElementById("background"), 125, 0, 64, 63, x, y, 64, 63)
        };

        let x = 0;
        let y = 0;

        for (let index = 1; index < 64; index++) {
            if ((index - 1) % 14 === 0 || index === 1) {
                halfBlock(x, y);
                x += 63;
            }
            fullBlock(x, y);
            x += 125;
            if (index % 7 === 0) {
                y += 63;
                x = 0;
            };
        }
    }
    drawIntroDialog() {
        let ctx = this.context;

        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
    }
}

var rect = {
    x: 0,
    y: 400,
    width: 290,
    height: 140
};

function playerClickedCanvas(event) {
    console.log(withinRect({
        x: event.offsetX,
        y: event.offsetY
    }, rect) ? "HIT" : "MISS");
}

function withinRect(coord, targetRec) {
    return (coord.x >= targetRec.x &&
        coord.x <= targetRec.x + targetRec.width &&
        coord.y >= targetRec.y &&
        coord.y <= targetRec.y + targetRec.height)
}

function startGame() {
    let game = new Game();
    game.drawBackground();
    game.drawIntroDialog();
}

startGame();