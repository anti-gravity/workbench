import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { Shape } from "../../src/examples/ts/enterDimensions/polygon/Shape";
const init = {
    "component": "Shape",
    "props": [
        {
            "type": "any",
            "label": "polygon",
            "defaultValue": null
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
            "type": "number",
            "label": "iconHeight",
            "defaultValue": 0
        },
        {
            "type": "any[]",
            "label": "selectedPoints",
            "defaultValue": []
        },
        {
            "type": "(point: any[]) => void",
            "label": "onPointClick",
            "defaultValue": null
        }
    ]
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {
        polygon: wb.getDefault(init, "polygon"),
        scale: wb.getDefault(init, "scale"),
        zoom: wb.getDefault(init, "zoom"),
        iconHeight: wb.getDefault(init, "iconHeight"),
        selectedPoints: wb.getDefault(init, "selectedPoints"),
        onPointClick: wb.getDefault(init, "onPointClick")
    };
    render() {
        return <Shape {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {
        polygon: wb.anyKnob(state, "Shape", "polygon"),
        scale: wb.numberKnob(state, "Shape", "scale"),
        zoom: wb.numberKnob(state, "Shape", "zoom"),
        iconHeight: wb.numberKnob(state, "Shape", "iconHeight"),
        selectedPoints: wb.anyKnob(state, "Shape", "selectedPoints"),
        onPointClick: wb.anyKnob(state, "Shape", "onPointClick")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
