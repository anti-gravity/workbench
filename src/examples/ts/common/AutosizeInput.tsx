// https://github.com/JedWatson/react-input-autosize/blob/master/src/AutosizeInput.js
import * as React from 'react';


const sizerStyle: React.CSSProperties = { position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre', letterSpacing: "normal" };

interface AutosizeInputProps extends React.Props<AutosizeInput> {
	font: FontStyle              			 // css styles for the input element
	style?: any
	minWidth?: number 		                 // minimum width for input element
	onAutosize: (width: number) => void
	onChange: (event) => void
	onKeyUp: (event) => void
	onBlur: (event) => void
	placeholder: string  				             // placeholder text
	placeholderIsMinWidth?: boolean                   // don't collapse size to less than the placeholder
	value: string
	defaultValue?: string			                 // default field value             
}

type FontStyle = {
	fontSize: string
	fontFamily: string
	fontWeight?: React.CSSWideKeyword | "normal" | "bold" | "bolder" | "lighter" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
	fontStyle?: React.CSSWideKeyword | "normal" | "italic" | "oblique"
	letterSpacing?: string
	color?: string
	blurredBackgroundColor?: string
}

interface AutosizeInputState {
	inputWidth?: number,
	focused?: boolean
}

export class AutosizeInput extends React.Component<AutosizeInputProps, AutosizeInputState> {

	static defaultProps = {
        minWidth: 1,
		defaultValue: "",
		placeholderIsMinWidth: true
    }

	constructor(props) {
        super(props);
        this.state = {
            inputWidth: this.props.minWidth,
			focused: false
        }
	}

	componentDidMount () {
		this.updateInputWidth();
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.inputWidth !== this.state.inputWidth) {
			// console.log(this.state.inputWidth)
			this.props.onAutosize(this.state.inputWidth);
		}
		this.updateInputWidth();
	}

	updateInputWidth = () => {
		const tweak = 0
		let newInputWidth: number;
		if (this.props.placeholder && (!this.props.value || (this.props.value && this.props.placeholderIsMinWidth))) {
			// console.log("Case A");
			newInputWidth = Math.max(this.sizer.scrollWidth, this.placeholderSizer.scrollWidth) + tweak;
		} else {
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
	}

	input: HTMLInputElement;
	sizer: HTMLDivElement;
	placeholderSizer: HTMLDivElement;

	focus = () => {
		this.input.focus();
	}

	blur = () => {
		this.input.blur();
	}
	select = () => {
		this.input.select();
	}
    
	render () {
		const sizerValue = [this.props.value, ''].reduce(function (previousValue, currentValue) {
			if (previousValue !== null && previousValue !== undefined) {
				return previousValue;
			}

			return currentValue;
		});
		
		const font = {...this.props.font};
		const backgroundColor = this.state.focused ? "white" : !!font.blurredBackgroundColor ? font.blurredBackgroundColor : "transparent"
		const color = !this.state.focused && !!font.color ? font.color : "black"
		return (
			<div style={{display: "flex"}}>
				<input 
					onKeyUp={this.props.onKeyUp}
					value={this.props.value}
					onChange={this.props.onChange}
					onFocus={() => { this.setState({focused: true}) }}
					onBlur={(e) => { this.setState({focused: false}); this.props.onBlur(e) }}
					placeholder={this.props.placeholder}
					style={{...font, ...this.props.style, ...{width: this.state.inputWidth + 'px', boxSizing: 'content-box', backgroundColor, color }}} 
					ref={elt => this.input = elt} />
				<div ref={elt => this.sizer = elt} style={{...font, ...sizerStyle}}>{sizerValue}</div>
				{!!this.props.placeholder && 
					<div ref={elt => this.placeholderSizer = elt} style={{...font, ...sizerStyle}}>{this.props.placeholder}</div>
				}
			</div>
		);
	}
}