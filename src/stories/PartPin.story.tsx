import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { PartPin } from "../../src/examples/ts/selectPins/PartPin";
const init = {
    "component": "PartPin",
    "props": [
        {
            "type": "number",
            "label": "iconHeight",
            "defaultValue": 0
        },
        {
            "type": "number",
            "label": "x",
            "defaultValue": 0
        },
        {
            "type": "number",
            "label": "y",
            "defaultValue": 0
        },
        {
            "type": "any",
            "label": "pad",
            "defaultValue": null
        },
        {
            "type": "(pad: any, name: string) => void",
            "label": "onNameChange",
            "defaultValue": null
        },
        {
            "type": "(pad: any) => void",
            "label": "onDelete",
            "defaultValue": null
        },
        {
            "type": "(pad: any, naturalX: number, naturalY: number) => void",
            "label": "onMoveEnd",
            "defaultValue": null
        },
        {
            "type": "boolean",
            "label": "opened",
            "defaultValue": null
        },
        {
            "type": "number",
            "label": "scale",
            "defaultValue": 0
        }
    ]
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {
        iconHeight: wb.getDefault(init, "iconHeight"),
        x: wb.getDefault(init, "x"),
        y: wb.getDefault(init, "y"),
        pad: wb.getDefault(init, "pad"),
        onNameChange: wb.getDefault(init, "onNameChange"),
        onDelete: wb.getDefault(init, "onDelete"),
        onMoveEnd: wb.getDefault(init, "onMoveEnd"),
        opened: wb.getDefault(init, "opened"),
        scale: wb.getDefault(init, "scale")
    };
    render() {
        return <PartPin {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {
        iconHeight: wb.numberKnob(state, "PartPin", "iconHeight"),
        x: wb.numberKnob(state, "PartPin", "x"),
        y: wb.numberKnob(state, "PartPin", "y"),
        pad: wb.anyKnob(state, "PartPin", "pad"),
        onNameChange: wb.anyKnob(state, "PartPin", "onNameChange"),
        onDelete: wb.anyKnob(state, "PartPin", "onDelete"),
        onMoveEnd: wb.anyKnob(state, "PartPin", "onMoveEnd"),
        opened: wb.anyKnob(state, "PartPin", "opened"),
        scale: wb.numberKnob(state, "PartPin", "scale")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
