import * as React from 'react'
import { ArtboardProps } from './types'

interface Props extends ArtboardProps {
    icon: JSX.Element
    x: number
    y: number
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    onClickElsewhere?: () => void
    onDragEnd?: (event: React.DragEvent<HTMLDivElement>, box: ClientRect) => void
    iconHeight?: number
}

interface State {
    box: ClientRect
    left: number
    top: number
}

export class Point extends React.Component<Props, Partial<State>> {
    constructor(props) {
        super(props);
        this.state = {
            box: undefined,
            left: (this.props.x) - (this.props.iconHeight / 2),
            top: (this.props.y) - (this.props.iconHeight / 2)
        }
    }

    static defaultProps = {
        iconHeight: 20
    }

    point: HTMLDivElement

    componentDidMount() {
        this.setState({box: this.point.getBoundingClientRect()})
        if(!!this.props.onClickElsewhere) {
            document.addEventListener('click', this.clickElsewhere)
        }
    }

    componentWillUnmount() {
        if(!!this.props.onClickElsewhere) {
            document.removeEventListener('click', this.clickElsewhere)
        }
    }

    clickElsewhere = (ev) => {
        if (!!this.point) {
            let children = this.point.querySelectorAll("*");
            let found = false;
            for (var i = 0; i < children.length; i++) {
                if (ev.target === children.item(i)) found = true;
            }

            if (ev.target !== this.point && !found) {
                this.props.onClickElsewhere();
            }
        }
    }

    componentWillUpdate(nextProps: Props, nextState: State) {
        if(this.props.x !== nextProps.x || this.props.y !== nextProps.y) {
            this.setState({
                left: (nextProps.x) - (this.props.iconHeight / 2),
                top: (nextProps.y) - (this.props.iconHeight / 2)
            })
        }
    }

    handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        const { artboard: {offset: {left, top}} } = this.props

        const x = (e.pageX - left - (this.state.box.width / 2))
        const y = (e.pageY - top - (this.state.box.height / 2))
        this.setState({left: x, top: y})
    }

    render() {
        const { box, top, left } = this.state;
        const {iconHeight, children, icon, onMouseEnter, onMouseLeave, onClick, onDragEnd } = this.props; 
        
        return (
            <div ref={el => this.point = el}
                style={{display: "flex", position: "absolute", pointerEvents: "auto", cursor: !!onClick ? "pointer" : "default", transform: `translate(${left}px,${top}px)`}}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                
            >   
                {children}
                <div onClick={onClick} style={{height: `${iconHeight}px`, cursor: !!onDragEnd ? "move" : ""}} onDragEnd={(e) => { onDragEnd(e, box)}} onDrag={this.handleDrag} draggable={!!onDragEnd}>
                    {icon}
                </div>
            </div>
        )
    }
}