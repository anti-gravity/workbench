import * as React from 'react'

type Point = {
    x: number
    y: number
}

type Pair = {
    P1: Point
    P2: Point
}

interface Props { 
    A1: [number, number]
    A2: [number, number]
    B1: [number, number]
    B2: [number, number]
    stroke: string
    width: number
    height: number
}

function addEndCap(pair: Pair, length: number): Pair {
    if(pair.P1.x === pair.P2.x) {
        // vertical
        if(pair.P1.y <= pair.P2.y) {
            // lengthen up
            pair.P2.y += length
            pair.P1.y += length / 2
        } else {
            // lengthen down
            pair.P2.y -= length
            pair.P1.y -= length / 2
        }
    } else {
        // horizontal
        if(pair.P1.x <= pair.P2.x) {
            pair.P2.x += length
            pair.P1.x += length / 2
        } else {
            pair.P2.x -= length
            pair.P1.x -= length / 2
        }
    }

    return pair
}

export const Figure: React.SFC<Props> = ({A1, A2, B1, B2, stroke, width, height}) => {

    const length = 16

    const A = addEndCap({P1: { x: A1[0], y: A1[1] }, P2: { x: A2[0], y: A2[1] }}, length)
    const B = addEndCap({P1: { x: B1[0], y: B1[1] }, P2: { x: B2[0], y: B2[1] }}, length)

    return (
        <svg style={{width: width, height: height}} >
            <marker id="triangle-end" viewBox="0 0 10 10" refX="10" refY="4" markerUnits="strokeWidth" markerWidth="4" markerHeight="8" orient="auto">
                <path d="M 0 8 L 10 4 L 0 0 z" fill={stroke}/>
            </marker>
            <marker id="triangle-start" viewBox="0 0 10 10" refX="0" refY="4" markerUnits="strokeWidth" markerWidth="4" markerHeight="8" orient="auto">
                <path d="M 10 0 L 0 4 L 10 8 z" fill={stroke}/>
            </marker>
            
            <line x1={A.P1.x} y1={A.P1.y} x2={A.P2.x} y2={A.P2.y} strokeWidth="2" stroke={stroke}/>
            <line x1={B.P1.x} y1={B.P1.y} x2={B.P2.x} y2={B.P2.y} strokeWidth="2" stroke={stroke}/>

            <line x1={A2[0]} y1={A2[1]} x2={B2[0]} y2={B2[1]} strokeWidth="2" stroke={stroke} markerEnd="url(#triangle-end)" markerStart="url(#triangle-start)"/>
        </svg>
    )
}