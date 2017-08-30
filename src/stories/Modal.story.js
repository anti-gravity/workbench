import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { Modal } from "../../src/examples/ts/common/modal/Modal";
const init = {
    "component": "Modal",
    "props": []
};
class Story extends React.Component {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    render() {
        return <Modal {...this.props}/>;
    }
}
Story.defaultProps = {};
function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
