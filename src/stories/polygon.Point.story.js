import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { Point } from "../../src/examples/ts/enterDimensions/polygon/Point";
const init = {
    "component": "polygon.Point",
    "props": [
        {
            "type": "any",
            "label": "point",
            "defaultValue": null
        },
        {
            "type": "boolean",
            "label": "selected",
            "defaultValue": null
        },
        {
            "type": "(point: any[]) => void",
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
        return <Point {...this.props}/>;
    }
}
Story.defaultProps = {
    point: wb.getDefault(init, "point"),
    selected: wb.getDefault(init, "selected"),
    onClick: wb.getDefault(init, "onClick"),
    iconHeight: wb.getDefault(init, "iconHeight")
};
function mapStateToProps(state) {
    return {
        point: wb.anyKnob(state, "polygon.Point", "point"),
        selected: wb.anyKnob(state, "polygon.Point", "selected"),
        onClick: wb.anyKnob(state, "polygon.Point", "onClick"),
        iconHeight: wb.numberKnob(state, "polygon.Point", "iconHeight")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
