import * as React from 'react'
import { ArtboardData, ArtboardProps } from './types'

export interface LayerProps {
    getArtboard: () => ArtboardData
    id?: string
}

export interface OptionalLayerProps {
    getArtboard?: () => ArtboardData
    id?: string
}

export const Layer: React.SFC<LayerProps> = ({getArtboard, children, id}) => {
    const artboard = getArtboard()
    return (
        <div id={id} style={{position: "absolute", pointerEvents: "none", width: artboard.size.width, height: artboard.size.height, alignSelf: "center"}}>
            {React.Children.map(children, (child: React.ReactElement<ArtboardProps>) => {
                if(React.isValidElement(child) && typeof child.type === 'function') {
                    return React.cloneElement(child, { ...child.props, artboard })
                }
                return child
            })}
        </div>
    )
}