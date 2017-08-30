import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { Fills } from "../../src/examples/ts/refinePads/Fill";
const init = {
    "component": "Fills",
    "props": [
        {
            "type": "any[]",
            "label": "polygons",
            "defaultValue": []
        },
        {
            "type": "string[]",
            "label": "rectangularNames",
            "defaultValue": []
        },
        {
            "type": "number",
            "label": "scale",
            "defaultValue": 0
        },
        {
            "type": "number",
            "label": "zoom",
            "defaultValue": 0
        },
        {
            "type": "boolean",
            "label": "enabled",
            "defaultValue": null
        },
        {
            "type": "(polygon: any) => void",
            "label": "onClick",
            "defaultValue": null
        },
        {
            "type": "number",
            "label": "iconHeight",
            "defaultValue": 0
        }
    ]
};
class Story extends React.Component {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    render() {
        return <Fills {...this.props}/>;
    }
}
Story.defaultProps = {
    polygons: wb.getDefault(init, "polygons"),
    rectangularNames: wb.getDefault(init, "rectangularNames"),
    scale: wb.getDefault(init, "scale"),
    zoom: wb.getDefault(init, "zoom"),
    enabled: wb.getDefault(init, "enabled"),
    onClick: wb.getDefault(init, "onClick"),
    iconHeight: wb.getDefault(init, "iconHeight")
};
function mapStateToProps(state) {
    return {
        polygons: wb.anyKnob(state, "Fills", "polygons"),
        rectangularNames: wb.anyKnob(state, "Fills", "rectangularNames"),
        scale: wb.numberKnob(state, "Fills", "scale"),
        zoom: wb.numberKnob(state, "Fills", "zoom"),
        enabled: wb.anyKnob(state, "Fills", "enabled"),
        onClick: wb.anyKnob(state, "Fills", "onClick"),
        iconHeight: wb.numberKnob(state, "Fills", "iconHeight")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
