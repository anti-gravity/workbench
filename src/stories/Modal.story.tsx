import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { Modal } from "../../src/examples/ts/common/modal/Modal";
const init = {
    "component": "Modal",
    "props": []
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {};
    render() {
        return <Modal {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
