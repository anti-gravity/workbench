import * as React from 'react'
import * as API from '../../../api'
import { PointIcon } from './PointIcon'

interface PointProps {
    point: API.AnchorPoint
    selected: boolean
    onClick: (point: API.AnchorPoint[]) => void
    iconHeight?: number
}

interface PointState {
    hovered: boolean
}

export class Point extends React.Component<PointProps, Partial<PointState>> {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        }
    }

    static defaultProps = {
        iconHeight: 10
    }

    handleClick = () => {
        this.props.onClick([this.props.point]);
    }

    handleMouseEnter = () => this.setState({hovered: true})
    handleMouseLeave = () => this.setState({hovered: false})
    
    render() {
        return (
            <div style={{display: "flex", position: "absolute", pointerEvents: "auto", cursor: "pointer"}}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <div style={{height: `${this.props.iconHeight}px`, transform: this.state.hovered || this.props.selected ? "scale(1.5)" : "", transition: "transform 200ms ease"}}>
                    <PointIcon opacity={this.state.hovered ? 1 : this.props.selected ? 1 : 0.5}/>
                </div>
            </div>
        )
    }
}