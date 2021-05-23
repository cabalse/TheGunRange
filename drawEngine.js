/********************/
/* Draw Engine v.1  */
/* 2021, Cabal_se   */
/********************/

class DrawEngine {
    constructor(ctx, images) {
        this.context = ctx;
        this.images = images;
    }
    drawImage(imageNr, x, y) {
        let i = this.images[imageNr];
        this.context.drawImage(i.image, i.sx, i.sy, i.sWidth, i.sHeight, x, y, i.dWidth, i.dHeight);
    }
    writeText(text, font, x, y) {
        this.context.font = font;
        this.context.fillText(text, x, y);
    }
}