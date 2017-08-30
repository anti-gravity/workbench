import * as React from 'react';
export function OCR({ scale, words, width, height, onValueClick, zoom }) {
    return (<div>
        {words.map(word => (<WordBox key={`${word.value}-${word.box[0]}-${word.box[1]}`} scale={scale} zoom={zoom} onValueClick={onValueClick} word={word}/>))}
        </div>);
}
export class WordBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseEnter = () => this.setState({ hovered: true });
        this.handleMouseLeave = () => this.setState({ hovered: false });
        this.handleClick = () => {
            const { word, onValueClick } = this.props;
            console.log("CLICK", word.value);
            onValueClick(word.value);
        };
        this.state = {
            hovered: false
        };
    }
    render() {
        const { word, scale, zoom } = this.props;
        const { hovered } = this.state;
        const x = (word.box[0] * scale * zoom) - 2;
        const y = (word.box[1] * scale * zoom) - 2;
        const width = (Math.abs(word.box[0] - word.box[2]) * scale * zoom) + 4;
        const height = Math.abs((word.box[3] - word.box[1]) * scale * zoom) + 4;
        const backgroundColor = hovered ? "#4283F2" : "white";
        const border = `1px solid ${hovered ? "white" : "#4283F2"}`;
        const color = hovered ? "white" : "#4283F2";
        return (<div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick} style={{ position: "absolute", width, height, transform: `translate(${x}px, ${y}px)`, borderRadius: 2, backgroundColor, border, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 10, cursor: "pointer", pointerEvents: "auto", color }}>
                {word.value}
            </div>);
    }
}
