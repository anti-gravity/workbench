export function findAP(id, polygons) {
    for (let i = 0; i < polygons.length; i++) {
        const ap = polygons[i].pts.find(pt => pt.id === id);
        if (!!ap)
            return ap;
    }
    return undefined;
}
export function alignTwoPointsToMP(direction, midPoint, anchorPointA, anchorPointB) {
    var A2 = midPoint.slice(0);
    var B2 = midPoint.slice(0);
    if (direction === "x") {
        A2[0] = anchorPointA[0];
        B2[0] = anchorPointB[0];
    }
    else {
        //console.log(anchorPointA, A2, B, B2);
        A2[1] = anchorPointA[1];
        B2[1] = anchorPointB[1];
        //console.log(anchorPointA, A2, B, B2);
    }
    return { A2: A2, B2: B2 };
}
export function formatFloat(entry, precision) {
    var floatVal = typeof entry === 'number' ? entry : parseFloat(entry);
    return (!isNaN(floatVal) ? floatVal.toLocaleString('en-US', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
    }) : "");
}
export function percentSolved(lines) {
    return (lines.reduce((prev, curr, index, arr) => {
        return arr[index].type === "padLine" ? prev + 1 : prev;
    }, 0) / lines.length) * 100;
}
export const getDirection = (x, y, A, B) => {
    if ((y > A[1] && y > B[1]) || (y < A[1] && y < B[1])) {
        // Horizontal
        return "x";
    }
    else if ((x > A[0] && x > B[0]) || (x < A[0] && x < B[0])) {
        // Vertical
        return "y";
    }
    else {
    }
};
