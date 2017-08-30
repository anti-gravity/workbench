import * as React from 'react';
export const Direction = ({ text }) => (<div style={{ fontSize: 12, fontWeight: 300, letterSpacing: 0.41, lineHeight: "16px", color: "#474747", marginBottom: 12 }}>{text}</div>);
export class Directions extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => this.setState({ open: !this.state.open });
        this.state = {
            open: false
        };
    }
    render() {
        const { text, moreText } = this.props;
        const { open } = this.state;
        return (<div>
                <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 12, color: "#474747" }}>Directions</div>
                <Direction text={text}/>
                {open && !!moreText && moreText}
                {!!moreText &&
            <div style={{ fontSize: 12, color: "#4990E2", cursor: "pointer" }} onClick={this.handleClick}>{open ? "Hide" : ""} Tips</div>}
            </div>);
    }
}
