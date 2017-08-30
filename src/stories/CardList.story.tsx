import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { CardList } from "../../src/examples/ts/sideBar/CardList";
const init = {
    "component": "CardList",
    "props": []
};
class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    static defaultProps = {};
    render() {
        return <CardList {...this.props}/>;
    }
}
function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
