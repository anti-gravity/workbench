import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { PartInformation } from "../../src/examples/ts/sideBar/elements/PartInformation";
const init = {
    "component": "PartInformation",
    "props": [
        {
            "type": "any",
            "label": "part",
            "defaultValue": null
        }
    ]
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {
        part: wb.getDefault(init, "part")
    };
    render() {
        return <PartInformation {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {
        part: wb.anyKnob(state, "PartInformation", "part")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
