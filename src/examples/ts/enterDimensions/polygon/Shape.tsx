import * as React from 'react'
import * as API from 'api'
import { Point } from './Point'

interface ShapeProps {
    polygon: API.Polygon
    scale: number
    zoom: number
    iconHeight?: number
    selectedPoints: API.AnchorPoint[]
    onPointClick: (point: API.AnchorPoint[]) => void
}

interface ShapeState {
    nameWidth: number,
    nameHeight: number
}

export class Shape extends React.Component<ShapeProps, Partial<ShapeState>> {
    
    constructor(props) {
        super(props);
        this.state = {
            nameWidth: 0,
            nameHeight: 0
        }
    }
    
    static defaultProps = {
        iconHeight: 10
    }

    name: HTMLDivElement

    componentDidMount() {
        this.setState({nameHeight: this.name.scrollHeight, nameWidth: this.name.scrollWidth})
    }
    
    render() {
        const fontSize = 12;
        const {scale, zoom, polygon, iconHeight, selectedPoints, onPointClick} = this.props;
        const {nameWidth, nameHeight} = this.state;
        const centerX = polygon.pts.map(pt => {
            return (pt.imgXY[0] * scale * zoom) - nameWidth / 2
        }).reduce((prev, curr, index, arr) => { return prev + curr }) / polygon.pts.length;
        const centerY = polygon.pts.map(pt => {
            return (pt.imgXY[1] * scale * zoom) - nameHeight / 2
        }).reduce((prev, curr, index, arr) => { return prev + curr }) / polygon.pts.length;
        return (
            <div style={{position: "absolute"}}>
                {
                    polygon.pts.map(pt => {
                        const transform = `translate(${(pt.imgXY[0] * scale * zoom) - iconHeight / 2}px,${(pt.imgXY[1] * scale * zoom) - iconHeight / 2}px)`
                        const selected = selectedPoints.some(point => point.id === pt.id)
                        return (
                            <div key={transform} style={{transform: transform}}>
                                <Point iconHeight={iconHeight} point={pt} onClick={onPointClick} selected={selected}/>
                            </div>
                        )
                    })
                }
                <div style={{fontSize: `${fontSize}px`, transform: `translate(${centerX}px, ${centerY}px)`}} ref={elt => this.name = elt}>
                    {this.props.polygon.name}
                </div>
            </div>
        )
    }
}