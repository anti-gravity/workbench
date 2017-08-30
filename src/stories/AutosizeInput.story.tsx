import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { AutosizeInput } from "../../src/examples/ts/common/AutosizeInput";
const init = {
    "component": "AutosizeInput",
    "props": [
        {
            "type": "FontStyle",
            "label": "font",
            "defaultValue": null
        },
        {
            "type": "any",
            "label": "style",
            "defaultValue": null
        },
        {
            "type": "number",
            "label": "minWidth",
            "defaultValue": 0
        },
        {
            "type": "(width: number) => void",
            "label": "onAutosize",
            "defaultValue": null
        },
        {
            "type": "(event: any) => void",
            "label": "onChange",
            "defaultValue": null
        },
        {
            "type": "(event: any) => void",
            "label": "onKeyUp",
            "defaultValue": null
        },
        {
            "type": "(event: any) => void",
            "label": "onBlur",
            "defaultValue": null
        },
        {
            "type": "string",
            "label": "placeholder",
            "defaultValue": ""
        },
        {
            "type": "boolean",
            "label": "placeholderIsMinWidth",
            "defaultValue": null
        },
        {
            "type": "string",
            "label": "value",
            "defaultValue": ""
        },
        {
            "type": "string",
            "label": "defaultValue",
            "defaultValue": ""
        }
    ]
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {
        font: wb.getDefault(init, "font"),
        style: wb.getDefault(init, "style"),
        minWidth: wb.getDefault(init, "minWidth"),
        onAutosize: wb.getDefault(init, "onAutosize"),
        onChange: wb.getDefault(init, "onChange"),
        onKeyUp: wb.getDefault(init, "onKeyUp"),
        onBlur: wb.getDefault(init, "onBlur"),
        placeholder: wb.getDefault(init, "placeholder"),
        placeholderIsMinWidth: wb.getDefault(init, "placeholderIsMinWidth"),
        value: wb.getDefault(init, "value"),
        defaultValue: wb.getDefault(init, "defaultValue")
    };
    render() {
        return <AutosizeInput {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {
        font: wb.anyKnob(state, "AutosizeInput", "font"),
        style: wb.anyKnob(state, "AutosizeInput", "style"),
        minWidth: wb.numberKnob(state, "AutosizeInput", "minWidth"),
        onAutosize: wb.anyKnob(state, "AutosizeInput", "onAutosize"),
        onChange: wb.anyKnob(state, "AutosizeInput", "onChange"),
        onKeyUp: wb.anyKnob(state, "AutosizeInput", "onKeyUp"),
        onBlur: wb.anyKnob(state, "AutosizeInput", "onBlur"),
        placeholder: wb.stringKnob(state, "AutosizeInput", "placeholder"),
        placeholderIsMinWidth: wb.anyKnob(state, "AutosizeInput", "placeholderIsMinWidth"),
        value: wb.stringKnob(state, "AutosizeInput", "value"),
        defaultValue: wb.stringKnob(state, "AutosizeInput", "defaultValue")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
