import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { PinToPadEditer } from "../../src/examples/ts/sideBar/elements/PinToPadEditor";
const init = {
    "component": "PinToPadEditer",
    "props": [
        {
            "type": "any",
            "label": "pad",
            "defaultValue": null
        },
        {
            "type": "(pad: any, pinName: string) => void",
            "label": "onNameChange",
            "defaultValue": null
        },
        {
            "type": "(pad: any) => void",
            "label": "onDelete",
            "defaultValue": null
        }
    ]
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {
        pad: wb.getDefault(init, "pad"),
        onNameChange: wb.getDefault(init, "onNameChange"),
        onDelete: wb.getDefault(init, "onDelete")
    };
    render() {
        return <PinToPadEditer {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {
        pad: wb.anyKnob(state, "PinToPadEditer", "pad"),
        onNameChange: wb.anyKnob(state, "PinToPadEditer", "onNameChange"),
        onDelete: wb.anyKnob(state, "PinToPadEditer", "onDelete")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
