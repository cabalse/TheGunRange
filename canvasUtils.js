function createCanvas(width, height, root) {
    let can = document.createElement("canvas");
    can.width = width;
    can.height = height;
    let ctx = can.getContext("2d");
    root.insertBefore(can, document.body.childNodes[0]);
    return { canvas: can, context: ctx };
}
