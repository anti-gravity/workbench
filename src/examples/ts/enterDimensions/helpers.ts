import * as API from 'api'

export function findAP(id: string, polygons: API.Polygon[]) {
    for(let i = 0; i < polygons.length; i++) {
        const ap = polygons[i].pts.find(pt => pt.id === id)
        if(!!ap) return ap
    }
    return undefined
}

export function alignTwoPointsToMP(direction: API.Direction, midPoint: [number, number], anchorPointA: [number, number], anchorPointB: [number, number]) {
    var A2 = midPoint.slice(0);
    var B2 = midPoint.slice(0);
    if(direction === "x") {
        A2[0] = anchorPointA[0]
        B2[0] = anchorPointB[0]
    } else {
        //console.log(anchorPointA, A2, B, B2);
        A2[1] = anchorPointA[1];
        B2[1] = anchorPointB[1];
        //console.log(anchorPointA, A2, B, B2);
    }
    return {A2: A2 as [number, number], B2: B2 as [number, number]}
}

export function formatFloat(entry: number|string, precision: number) {
    var floatVal = typeof entry === 'number' ? entry : parseFloat(entry);
    return (!isNaN(floatVal) ? floatVal.toLocaleString('en-US', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
    }) : "");
}

export function percentSolved(lines: API.Line[]) {
    return (lines.reduce((prev, curr, index, arr) => {
                return arr[index].type === "padLine" ? prev + 1 : prev
            }, 0) / lines.length) * 100
}

export const getDirection = (x: number, y: number, A: [number, number], B: [number, number]): API.Direction => {
    if((y > A[1] && y > B[1]) || (y < A[1] && y < B[1])) {
        // Horizontal
        return "x"
    } else if((x > A[0] && x > B[0]) || (x < A[0] && x < B[0])) {
        // Vertical
        return "y"
    } else {

    }
}