/*****************/
/* The Gun Range */
/*     2021      */
/*   Cabal_se    */
/*****************/

const CANVAS_WIDTH = 814;
const CANVAS_HEIGHT = 566;

const images = [{
        image: document.getElementById("background"),
        sx: 0,
        sy: 0,
        sWidth: 127,
        sHeight: 63,
        dWidth: 127,
        dHeight: 63
    },
    {
        image: document.getElementById("background"),
        sx: 125,
        sy: 0,
        sWidth: 64,
        sHeight: 63,
        dWidth: 64,
        dHeight: 63
    },
    {
        image: document.getElementById("dialog"),
        sx: 0,
        sy: 0,
        sWidth: 2058,
        sHeight: 394,
        dWidth: 790,
        dHeight: 152
    },
];

class Game {
    constructor() {
        this.dialogs = new DialogEngine(CANVAS_WIDTH, CANVAS_HEIGHT, "canvas");
        this.initCanvas();
        this.initEventListerners();
        this.backgroundDrawEngine = new DrawEngine(this.backgroundContext, images);
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
            this.backgroundDrawEngine.drawImage(0, x, y);
        };

        const halfBlock = (x, y) => {
            this.backgroundDrawEngine.drawImage(1, x, y);
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
    game.dialogs.openDialogs([{
        dialog: "intro",
        onClose: null
    }, {
        dialog: "ready",
        onClose: () => console.log("START!!!!")
    }]);
}

startGame();