import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { AnnotationBox } from "../../src/examples/ts/enterDimensions/annotation/AnnotationBox";
const init = {
    "component": "AnnotationBox",
    "props": [
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
            "type": "Pointing",
            "label": "pointing",
            "defaultValue": null
        },
        {
            "type": "string",
            "label": "defaultDistance",
            "defaultValue": ""
        },
        {
            "type": "() => void",
            "label": "onDelete",
            "defaultValue": null
        },
        {
            "type": "(distance: string) => void",
            "label": "onChange",
            "defaultValue": null
        },
        {
            "type": "boolean",
            "label": "focusOnMount",
            "defaultValue": null
        },
        {
            "type": "\"mm\" | \"in\"",
            "label": "unit",
            "defaultValue": null
        }
    ]
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {
        x: wb.getDefault(init, "x"),
        y: wb.getDefault(init, "y"),
        pointing: wb.getDefault(init, "pointing"),
        defaultDistance: wb.getDefault(init, "defaultDistance"),
        onDelete: wb.getDefault(init, "onDelete"),
        onChange: wb.getDefault(init, "onChange"),
        focusOnMount: wb.getDefault(init, "focusOnMount"),
        unit: wb.getDefault(init, "unit")
    };
    render() {
        return <AnnotationBox {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {
        x: wb.numberKnob(state, "AnnotationBox", "x"),
        y: wb.numberKnob(state, "AnnotationBox", "y"),
        pointing: wb.anyKnob(state, "AnnotationBox", "pointing"),
        defaultDistance: wb.stringKnob(state, "AnnotationBox", "defaultDistance"),
        onDelete: wb.anyKnob(state, "AnnotationBox", "onDelete"),
        onChange: wb.anyKnob(state, "AnnotationBox", "onChange"),
        focusOnMount: wb.anyKnob(state, "AnnotationBox", "focusOnMount"),
        unit: wb.anyKnob(state, "AnnotationBox", "unit")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
