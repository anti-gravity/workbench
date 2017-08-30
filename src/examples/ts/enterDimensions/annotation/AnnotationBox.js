import * as React from 'react';
import { AutosizeInput, Triangle } from '../..';
export class AnnotationBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (ev) => {
            this.setState({ distance: ev.target.value });
        };
        this.handleAutosize = (w = 0) => {
            if (!!this.inputParent) {
                const width = this.inputParent.scrollWidth;
                const height = this.inputParent.scrollHeight;
                if (this.state.width !== width || this.state.height !== height) {
                    //console.log("Resizing", this.inputParent)
                    this.setState({ width: width, height: height });
                }
            }
        };
        // handleClick = (ev) => {
        //     this.state.focused ? this.handleClose() : this.handleOpen();
        // }
        this.handleOnMouseEnter = () => this.setState({ hovered: true });
        this.handleOnMouseLeave = () => this.setState({ hovered: false });
        this.handleOpen = () => {
            //this.input.focus();
            this.setState({ focused: true });
        };
        this.handleClose = () => {
            this.setState({ focused: false });
            if (this.props.defaultDistance.toString() !== this.state.distance && !isNaN(parseFloat(this.state.distance))) {
                this.props.onChange(this.state.distance);
            }
            else if (isNaN(parseFloat(this.state.distance))) {
                this.setState({ distance: this.props.defaultDistance.toString() });
            }
        };
        this.handleInputKeyUp = (ev) => {
            //esc or enter will blur the textbox
            if (ev.keyCode == 13 || ev.keyCode == 27) {
                this.input.blur();
            }
        };
        this.handlePinKeyUp = (ev) => {
            if (ev.keyCode == 46 && this.state.focused) {
                this.props.onDelete();
            }
        };
        this.clickElsewhere = (ev) => {
            if (!!this.wrap && this.state.focused && !this.state.hovered) {
                let children = this.wrap.querySelectorAll("*");
                let found = false;
                for (var i = 0; i < children.length; i++) {
                    if (ev.target === children.item(i))
                        found = true;
                }
                if (ev.target !== this.wrap && !found) {
                    this.input.blur();
                }
            }
        };
        this.state = {
            distance: this.props.defaultDistance.toString(),
            focused: false,
            hovered: false,
            width: 10,
            height: 10
        };
    }
    componentDidUpdate() {
        this.handleAutosize();
    }
    componentDidMount() {
        if (this.props.focusOnMount) {
            this.input.focus();
        }
        const box = this.wrap.getBoundingClientRect();
        this.setState({ wrapHeight: box.height, wrapWidth: box.width });
        this.handleAutosize();
        document.addEventListener('click', this.clickElsewhere);
        document.addEventListener('keyup', this.handlePinKeyUp);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.clickElsewhere);
        document.removeEventListener('keyup', this.handlePinKeyUp);
    }
    render() {
        const { pointing, x, y, unit, defaultDistance, onDelete } = this.props;
        const direction = pointing === "left" ? "v" : "h";
        const { height, width, hovered, focused, wrapHeight, wrapWidth } = this.state;
        var translate = `translate(${x}px,${y}px)`;
        if (!!height && !!width) {
            translate = (() => {
                switch (pointing) {
                    case "left":
                        return `translate(${x + 2}px,${y - (height / 2)}px)`;
                    case "down":
                        return `translate(${x - (width / 2)}px,${y - height - 2}px)`;
                    case "up":
                        return `translate(${x - (width / 2)}px,${y + 2}px)`;
                }
            })();
        }
        return (<div ref={elt => this.wrap = elt} style={{ display: "flex", position: "absolute", pointerEvents: "auto", cursor: "pointer", transform: translate, zIndex: 100 }} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
                <div style={{ position: "relative" }}>
                    <div ref={elt => this.inputParent = elt} style={{ position: "absolute", top: `0px`, pointerEvents: "auto", display: "flex", flexDirection: direction === "h" ? "column" : "row" }} onClick={this.handleOpen} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
                        <div style={{ order: pointing === "down" ? 1 : 0, margin: "auto", display: "flex" }}>
                            <Triangle direction={pointing} style={{ margin: "auto" }}/>
                        </div>
                        <div style={{ display: "flex", backgroundColor: "#4283F2", borderRadius: "2px", padding: "4px", alignItems: "center" }}>
                            <AutosizeInput ref={elt => this.input = elt} onAutosize={this.handleAutosize} placeholder={defaultDistance.toString()} onChange={this.handleChange} onKeyUp={this.handleInputKeyUp} onBlur={this.handleClose} value={this.state.distance.toString()} font={{ fontSize: "12px", fontFamily: 'Muli', color: "white" }} style={{ outline: "none", border: "none", backgroundColor: "white" }} minWidth={12}/>
                            {!!unit &&
            <div style={{ color: "white", fontSize: 12, marginLeft: 4 }}>
                                    {unit === "mm" ? "mm" : "in"}
                                </div>}
                            {(hovered || focused) &&
            <div style={{ color: "white", fontSize: 12, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", marginLeft: 4, pointerEvents: "auto" }} onClick={() => { onDelete(); }}>
                                    x
                                </div>}
                        </div>
                    </div>
                </div>
            </div>);
    }
}
AnnotationBox.defaultProps = {
    focusOnMount: true
};
