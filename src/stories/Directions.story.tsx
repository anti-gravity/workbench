import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { Directions } from "../../src/examples/ts/sideBar/elements/Directions";
const init = {
    "component": "Directions",
    "props": [
        {
            "type": "string",
            "label": "text",
            "defaultValue": ""
        },
        {
            "type": "JSX.Element",
            "label": "moreText",
            "defaultValue": null
        }
    ]
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {
        text: wb.getDefault(init, "text"),
        moreText: wb.getDefault(init, "moreText")
    };
    render() {
        return <Directions {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {
        text: wb.stringKnob(state, "Directions", "text"),
        moreText: wb.anyKnob(state, "Directions", "moreText")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
