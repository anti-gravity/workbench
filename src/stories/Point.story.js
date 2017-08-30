import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { Point } from "../../src/examples/ts/artboard/Point";
const init = {
    "component": "Point",
    "props": [
        {
            "type": "JSX.Element",
            "label": "icon",
            "defaultValue": null
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
            "type": "() => void",
            "label": "onMouseEnter",
            "defaultValue": null
        },
        {
            "type": "() => void",
            "label": "onMouseLeave",
            "defaultValue": null
        },
        {
            "type": "(event: React.MouseEvent<HTMLDivElement>) => void",
            "label": "onClick",
            "defaultValue": null
        },
        {
            "type": "() => void",
            "label": "onClickElsewhere",
            "defaultValue": null
        },
        {
            "type": "(event: React.DragEvent<HTMLDivElement>, box: ClientRect) => void",
            "label": "onDragEnd",
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
    icon: wb.getDefault(init, "icon"),
    x: wb.getDefault(init, "x"),
    y: wb.getDefault(init, "y"),
    onMouseEnter: wb.getDefault(init, "onMouseEnter"),
    onMouseLeave: wb.getDefault(init, "onMouseLeave"),
    onClick: wb.getDefault(init, "onClick"),
    onClickElsewhere: wb.getDefault(init, "onClickElsewhere"),
    onDragEnd: wb.getDefault(init, "onDragEnd"),
    iconHeight: wb.getDefault(init, "iconHeight")
};
function mapStateToProps(state) {
    return {
        icon: wb.anyKnob(state, "Point", "icon"),
        x: wb.numberKnob(state, "Point", "x"),
        y: wb.numberKnob(state, "Point", "y"),
        onMouseEnter: wb.anyKnob(state, "Point", "onMouseEnter"),
        onMouseLeave: wb.anyKnob(state, "Point", "onMouseLeave"),
        onClick: wb.anyKnob(state, "Point", "onClick"),
        onClickElsewhere: wb.anyKnob(state, "Point", "onClickElsewhere"),
        onDragEnd: wb.anyKnob(state, "Point", "onDragEnd"),
        iconHeight: wb.numberKnob(state, "Point", "iconHeight")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
