import * as React from 'react';
export class Point extends React.Component {
    constructor(props) {
        super(props);
        this.clickElsewhere = (ev) => {
            if (!!this.point) {
                let children = this.point.querySelectorAll("*");
                let found = false;
                for (var i = 0; i < children.length; i++) {
                    if (ev.target === children.item(i))
                        found = true;
                }
                if (ev.target !== this.point && !found) {
                    this.props.onClickElsewhere();
                }
            }
        };
        this.handleDrag = (e) => {
            const { artboard: { offset: { left, top } } } = this.props;
            const x = (e.pageX - left - (this.state.box.width / 2));
            const y = (e.pageY - top - (this.state.box.height / 2));
            this.setState({ left: x, top: y });
        };
        this.state = {
            box: undefined,
            left: (this.props.x) - (this.props.iconHeight / 2),
            top: (this.props.y) - (this.props.iconHeight / 2)
        };
    }
    componentDidMount() {
        this.setState({ box: this.point.getBoundingClientRect() });
        if (!!this.props.onClickElsewhere) {
            document.addEventListener('click', this.clickElsewhere);
        }
    }
    componentWillUnmount() {
        if (!!this.props.onClickElsewhere) {
            document.removeEventListener('click', this.clickElsewhere);
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.props.x !== nextProps.x || this.props.y !== nextProps.y) {
            this.setState({
                left: (nextProps.x) - (this.props.iconHeight / 2),
                top: (nextProps.y) - (this.props.iconHeight / 2)
            });
        }
    }
    render() {
        const { box, top, left } = this.state;
        const { iconHeight, children, icon, onMouseEnter, onMouseLeave, onClick, onDragEnd } = this.props;
        return (<div ref={el => this.point = el} style={{ display: "flex", position: "absolute", pointerEvents: "auto", cursor: !!onClick ? "pointer" : "default", transform: `translate(${left}px,${top}px)` }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>   
                {children}
                <div onClick={onClick} style={{ height: `${iconHeight}px`, cursor: !!onDragEnd ? "move" : "" }} onDragEnd={(e) => { onDragEnd(e, box); }} onDrag={this.handleDrag} draggable={!!onDragEnd}>
                    {icon}
                </div>
            </div>);
    }
}
Point.defaultProps = {
    iconHeight: 20
};
