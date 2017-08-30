import * as React from 'react';
import { Icon } from '../..';
export class PinToPadEditer extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnDelete = () => {
            this.props.onDelete(this.props.pad);
        };
        this.handleOnChange = (ev) => {
            this.setState({ pinName: ev.target.value });
        };
        this.handleOpen = () => {
            //this.input.focus();
            this.setState({ focused: true });
        };
        this.handleClose = () => {
            this.input.blur();
            this.setState({ focused: false });
            if (this.props.pad.pinName !== this.state.pinName) {
                this.props.onNameChange(this.props.pad, this.state.pinName);
            }
        };
        this.clickElsewhere = (ev) => {
            if (!!this.partPin && this.state.focused) {
                let children = this.partPin.querySelectorAll("*");
                let found = false;
                for (var i = 0; i < children.length; i++) {
                    if (ev.target === children.item(i))
                        found = true;
                }
                if (ev.target !== this.partPin && !found) {
                    this.handleClose();
                }
            }
        };
        this.handleInputKeyUp = (ev) => {
            //esc or enter will blur the textbox
            if (ev.keyCode == 13 || ev.keyCode == 27) {
                this.handleClose();
            }
        };
        this.state = {
            padName: this.props.pad.name,
            pinName: this.props.pad.pinName,
            focused: false
        };
    }
    componentDidMount() {
        //this.input.focus();
        document.addEventListener('click', this.clickElsewhere);
        //this.handleAutosize()
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.clickElsewhere);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.pad.pinName !== this.props.pad.pinName) {
            this.setState({ pinName: this.props.pad.pinName });
        }
    }
    render() {
        const { pinName, padName, focused } = this.state;
        return (<div style={{ display: "flex", justifyContent: "space-between", lineHeight: "20px", padding: "0 12px 0 12px", height: 36, alignItems: "center" }} ref={elt => this.partPin = elt}>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ width: 32, fontSize: 12 }}>
                        {padName}
                    </div>
                    <div style={{}}>
                        <input ref={elt => this.input = elt} type="text" value={pinName} onBlur={this.handleClose} onChange={this.handleOnChange} onClick={this.handleOpen} onKeyUp={this.handleInputKeyUp} style={{ padding: "0 0 0 30px", border: "none", outline: "none", backgroundColor: "transparent", fontSize: 12 }}></input>
                    </div>
                </div>
                {!!this.props.onDelete &&
            <div style={{ cursor: "pointer" }} onClick={this.handleOnDelete}>
                        <Icon.Close />
                    </div>}
            </div>);
    }
}
