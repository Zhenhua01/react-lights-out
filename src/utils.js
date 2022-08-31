/** Determine starting cell value based on chanceLightStartsOn */

function startsOn(chanceLightStartsOn) {
    return Math.random() > chanceLightStartsOn ? false : true;
}

export { startsOn };