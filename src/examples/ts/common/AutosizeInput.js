// https://github.com/JedWatson/react-input-autosize/blob/master/src/AutosizeInput.js
import * as React from 'react';
const sizerStyle = { position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre', letterSpacing: "normal" };
export class AutosizeInput extends React.Component {
    constructor(props) {
        super(props);
        this.updateInputWidth = () => {
            const tweak = 0;
            let newInputWidth;
            if (this.props.placeholder && (!this.props.value || (this.props.value && this.props.placeholderIsMinWidth))) {
                // console.log("Case A");
                newInputWidth = Math.max(this.sizer.scrollWidth, this.placeholderSizer.scrollWidth) + tweak;
            }
            else {
                // console.log("Case B");
                newInputWidth = this.sizer.scrollWidth + tweak;
            }
            if (newInputWidth < this.props.minWidth) {
                // console.log("Case C");
                newInputWidth = this.props.minWidth;
            }
            if (newInputWidth !== this.state.inputWidth) {
                this.setState({
                    inputWidth: newInputWidth
                });
            }
        };
        this.focus = () => {
            this.input.focus();
        };
        this.blur = () => {
            this.input.blur();
        };
        this.select = () => {
            this.input.select();
        };
        this.state = {
            inputWidth: this.props.minWidth,
            focused: false
        };
    }
    componentDidMount() {
        this.updateInputWidth();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.inputWidth !== this.state.inputWidth) {
            // console.log(this.state.inputWidth)
            this.props.onAutosize(this.state.inputWidth);
        }
        this.updateInputWidth();
    }
    render() {
        const sizerValue = [this.props.value, ''].reduce(function (previousValue, currentValue) {
            if (previousValue !== null && previousValue !== undefined) {
                return previousValue;
            }
            return currentValue;
        });
        const font = Object.assign({}, this.props.font);
        const backgroundColor = this.state.focused ? "white" : !!font.blurredBackgroundColor ? font.blurredBackgroundColor : "transparent";
        const color = !this.state.focused && !!font.color ? font.color : "black";
        return (<div style={{ display: "flex" }}>
				<input onKeyUp={this.props.onKeyUp} value={this.props.value} onChange={this.props.onChange} onFocus={() => { this.setState({ focused: true }); }} onBlur={(e) => { this.setState({ focused: false }); this.props.onBlur(e); }} placeholder={this.props.placeholder} style={Object.assign({}, font, this.props.style, { width: this.state.inputWidth + 'px', boxSizing: 'content-box', backgroundColor, color })} ref={elt => this.input = elt}/>
				<div ref={elt => this.sizer = elt} style={Object.assign({}, font, sizerStyle)}>{sizerValue}</div>
				{!!this.props.placeholder &&
            <div ref={elt => this.placeholderSizer = elt} style={Object.assign({}, font, sizerStyle)}>{this.props.placeholder}</div>}
			</div>);
    }
}
AutosizeInput.defaultProps = {
    minWidth: 1,
    defaultValue: "",
    placeholderIsMinWidth: true
};
