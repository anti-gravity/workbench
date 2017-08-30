import * as React from 'react'
import * as API from '../../api'
import { ArtboardProps } from 'components'

interface Props extends ArtboardProps {
    lines: API.Line[]
    scale: number
    zoom: number
}

export const DrawSolvedPart: React.SFC<Props> = ({lines, artboard, scale, zoom}) => {
    const {size: {width, height}} = artboard
    return (
        <svg style={{width: `${width}px`, height: `${height}px`}}>
            {lines.map(line => {
                type lineStyle = {strokeWidth: string, stroke: string, dashArray: string}
                let style: lineStyle;
                switch(line.type) {
                    case "padLine": 
                        style = { stroke: "#4CC27C", strokeWidth: "3px", dashArray: ""}
                        break;
                    case "badSpacingLine": 
                        style = { stroke: "#FD5C63", strokeWidth: "3px", dashArray: "2, 2" }
                        break;
                    case "badDimLine":
                        style = { stroke: "#FD5C63", strokeWidth: "3px", dashArray: "" }
                        break;
                    default: 
                        style = { stroke: "pink", strokeWidth: "3px", dashArray: "2, 2" }
                        break;
                }                        
                return (
                    <line key={`${line.type}-${line.xy1}-${line.xy2}`} strokeDasharray={style.dashArray} strokeWidth={style.strokeWidth} stroke={style.stroke} 
                        x1={line.xy1[0] * scale * zoom} y1={line.xy1[1] * scale * zoom} 
                        x2={line.xy2[0] * scale * zoom} y2={(line.xy2[1]* scale * zoom)}
                    />
                );
            })}
        </svg>
    )
}
