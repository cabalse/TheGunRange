function withinRect(coord, targetRec) {
    return (coord.x >= targetRec.x &&
        coord.x <= targetRec.x + targetRec.width &&
        coord.y >= targetRec.y &&
        coord.y <= targetRec.y + targetRec.height)
}

