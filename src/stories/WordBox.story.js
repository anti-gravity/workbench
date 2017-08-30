import * as React from 'react';
import * as wb from '../workbench';
import { connect } from 'react-redux';
import { WordBox } from "../../src/examples/ts/enterDimensions/OCR";
const init = {
    "component": "WordBox",
    "props": [
        {
            "type": "any",
            "label": "word",
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
            "type": "(value: string) => void",
            "label": "onValueClick",
            "defaultValue": null
        }
    ]
};
class Story extends React.Component {
    componentDidMount() {
        this.props.init(init, "passive"); // "override" write mode when the use hits reset
    }
    render() {
        return <WordBox {...this.props}/>;
    }
}
Story.defaultProps = {
    word: wb.getDefault(init, "word"),
    scale: wb.getDefault(init, "scale"),
    zoom: wb.getDefault(init, "zoom"),
    onValueClick: wb.getDefault(init, "onValueClick")
};
function mapStateToProps(state) {
    return {
        word: wb.anyKnob(state, "WordBox", "word"),
        scale: wb.numberKnob(state, "WordBox", "scale"),
        zoom: wb.numberKnob(state, "WordBox", "zoom"),
        onValueClick: wb.anyKnob(state, "WordBox", "onValueClick")
    };
}
export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story);
