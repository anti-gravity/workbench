import * as React from 'react';
import { Pin } from './Pin';
import { Point, AutosizeInput } from '..';
export class PartPin extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputKeyUp = (ev) => {
            //esc or enter will blur the textbox
            if (ev.keyCode == 13 || ev.keyCode == 27) {
                this.input.blur();
            }
        };
        this.handleChange = (ev) => {
            this.setState({ value: ev.target.value });
        };
        this.handleAutosize = (w = 0) => {
            if (!!this.inputParent) {
                const width = this.inputParent.scrollWidth;
                if (this.state.width !== width) {
                    //console.log("Resizing", this.inputParent)
                    this.setState({ width: this.inputParent.scrollWidth });
                }
            }
        };
        this.handleClick = (event) => {
            if (this.state.focused) {
                event.nativeEvent.stopPropagation();
                this.input.blur();
            }
            else {
                this.handleOpen();
            }
        };
        this.handleOnMouseEnter = () => this.setState({ hovered: true });
        this.handleOnMouseLeave = () => this.setState({ hovered: false });
        this.handleOpen = () => {
            //this.input.focus();
            this.setState({ focused: true });
        };
        this.handleClose = () => {
            const { pad } = this.props;
            this.setState({ focused: false });
            if (pad.pinName !== this.state.value && this.state.value !== "") {
                this.props.onNameChange(pad, this.state.value);
            }
            else if (this.state.value === "") {
                this.setState({ value: pad.pinName });
            }
        };
        this.clickElsewhere = () => {
            if (this.state.focused && !this.state.hovered) {
                this.input.blur();
            }
        };
        this.handlePinKeyUp = (ev) => {
            if (ev.keyCode == 46 && this.state.focused) {
                this.props.onDelete(this.props.pad);
            }
        };
        this.handleDrag = (e, box) => {
            const { onMoveEnd, pad, artboard: { offset: { left, top } }, scale } = this.props;
            const naturalX = (e.pageX - left + (box.width / 2)) / scale;
            const naturalY = (e.pageY - top - (box.height / 2)) / scale;
            onMoveEnd(pad, naturalX, naturalY);
        };
        this.state = {
            value: this.props.pad.pinName,
            focused: false,
            hovered: false,
            width: this.props.pad.pinName.length
        };
    }
    componentDidMount() {
        //this.input.focus();
        document.addEventListener('keyup', this.handlePinKeyUp);
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.handlePinKeyUp);
    }
    componentDidUpdate(prevProps, prevState) {
        const { pad } = this.props;
        if (pad.pinName !== prevProps.pad.pinName) {
            console.log("Name is different:", pad.pinName, prevProps.pad.pinName);
            this.setState({ value: pad.pinName });
        }
        this.handleAutosize();
    }
    render() {
        const { value, hovered, focused, width } = this.state;
        const { iconHeight, pad, x, y, opened, artboard, scale } = this.props;
        return (<Point icon={<Pin focus={focused || hovered}/>} x={x} y={y} artboard={artboard} onDragEnd={this.handleDrag} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} onClick={this.handleClick} onClickElsewhere={this.clickElsewhere}>  
                {(hovered || focused || opened) &&
            <div style={{ position: "relative" }}>
                        <div ref={elt => this.inputParent = elt} style={{ position: "absolute", top: `-${iconHeight + 6}px`, right: `${-((width / 2) + 9.5)}px`, pointerEvents: "auto" }} onClick={this.handleOpen} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
                            <div style={{ display: "flex", backgroundColor: "white", border: "1px solid #4283F2", borderRadius: "2px", padding: "4px" }}>
                                <AutosizeInput ref={elt => this.input = elt} onAutosize={this.handleAutosize} placeholder={pad.name} onChange={this.handleChange} onKeyUp={this.handleInputKeyUp} onBlur={this.handleClose} value={value} font={{ fontSize: "12px", fontFamily: "Muli", color: "#4283F2", blurredBackgroundColor: "white" }} style={{ outline: "none", border: "none", backgroundColor: "white", padding: 0 }}/>
                            </div>
                            <div>
                                <div style={{ width: 0, height: 0, margin: "auto", boxSizing: "border-box", borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #4283F2" }}>
                                </div>
                            </div>
                        </div>
                    </div>}
            </Point>);
    }
}
