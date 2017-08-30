import * as React from 'react'
import { Point, Icon, ArtboardProps } from '..'

interface Props extends ArtboardProps {
    x: number
    y: number
    onClick: () => void
}

export const Subtract: React.SFC<Props> = ({x, y, artboard, onClick}) => (
    <Point icon={<Icon.Subtract primary={"red"}/>} x={x} y={y} iconHeight={8} artboard={artboard} onClick={onClick}/>
)