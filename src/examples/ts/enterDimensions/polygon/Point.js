import * as React from 'react';
import { PointIcon } from './PointIcon';
export class Point extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            this.props.onClick([this.props.point]);
        };
        this.handleMouseEnter = () => this.setState({ hovered: true });
        this.handleMouseLeave = () => this.setState({ hovered: false });
        this.state = {
            hovered: false
        };
    }
    render() {
        return (<div style={{ display: "flex", position: "absolute", pointerEvents: "auto", cursor: "pointer" }} onClick={this.handleClick} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div style={{ height: `${this.props.iconHeight}px`, transform: this.state.hovered || this.props.selected ? "scale(1.5)" : "", transition: "transform 200ms ease" }}>
                    <PointIcon opacity={this.state.hovered ? 1 : this.props.selected ? 1 : 0.5}/>
                </div>
            </div>);
    }
}
Point.defaultProps = {
    iconHeight: 10
};
