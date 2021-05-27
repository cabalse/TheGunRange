/*********************/
/*   Dialog Engine   */
/*  2021, Cabal_se   */
/*       v0.1        */
/*********************/

const TITLE_FONT = "30px Arial";
const SUBTITLE_FONT = "20px Arial";
const SMALL_FONT = "14px Arial";

const dialogImages = [{
    image: document.getElementById("dialog"),
    sx: 0,
    sy: 0,
    sWidth: 2058,
    sHeight: 394,
    dWidth: 790,
    dHeight: 152
}, ];

const dialogText = [{
    name: "intro",
    background: 0,
    x: 10,
    y: 10,
    texts: [{
            text: "Welcome to the gun-range!",
            font: TITLE_FONT,
            x: 25,
            y: 45
        },
        {
            text: "It's time to spend ammo, unloading guns at some targets.",
            font: SUBTITLE_FONT,
            x: 25,
            y: 80
        },
        {
            text: "Highest point wins! Just click to start.",
            font: SUBTITLE_FONT,
            x: 25,
            y: 115
        },
        {
            text: "Click",
            font: SUBTITLE_FONT,
            x: 730,
            y: 150
        },
    ]
}, {
    name: "ready",
    background: 0,
    x: 10,
    y: 10,
    texts: [{
            text: "Get ready to rumble!!!!!",
            font: SUBTITLE_FONT,
            x: 25,
            y: 45
        },
        {
            text: "Click",
            font: SUBTITLE_FONT,
            x: 730,
            y: 150
        },
    ]
}]

class DialogEngine {
    constructor(width, height) {
        this.initCanvas(width, height)
        this.drawEngine = new DrawEngine(this.context, dialogImages);
    }
    initCanvas(width, height) {
        let can = createCanvas(width, height, document.body);
        this.canvas = can.canvas;
        this.context = can.context;
    }
    disableCanvas() {
        this.canvas.style.display = "none";
    }
    getDialogInfo(name) {
        return dialogText.filter(item => item.name === name)[0];
    }
    openDialogs(dialogs) {
        const dia = dialogs.shift();
        let onClose = () => {
            this.openDialogs(dialogs);
        };
        if (dia && dia.onClose) {
            onClose = dia.onClose;
        }
        this.openDialog(dia.dialog, onClose);
    }
    openDialog(name, onClose) {
        let ctx = this.contexgetDialogInfot;
        const dialog = this.getDialogInfo(name);
        this.drawEngine.drawImage(dialog.background, dialog.x, dialog.y, ctx);
        dialog.texts.map(text => {
            this.drawEngine.writeText(text.text, text.font, text.x, text.y);
        });
        const closeFunction = () => {
            this.canvas.removeEventListener('click', closeFunction);
            this.closeDialog();
            onClose();
        };
        this.canvas.addEventListener('click', closeFunction, false);
    }
    closeDialog() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}