import * as React from 'react'
import * as wb from '../workbench'
import { connect } from 'react-redux'

const init = {
    component: "ImportedComponentName",
    props: [
        // {   
        //     type: "string",
        //     label: "src",
        //     defaultValue: ""
        // }
    ]
}

class Story extends React.Component<any, {}> {
    componentDidMount() {
        this.props.init(init, "passive") // "override" write mode when the use hits reset
    }

    static defaultProps = {
        // src: getDefault(init, "src"), 
        // scale: getDefault(init, "scale")
    }

    render() {
        // return <ImportedComponentName {...this.props} /> 
    }
}

function mapStateToProps(state) {
    return {
        // src: wb.stringKnob(state, "ScaledImage", "src"),
        // scale: wb.numberKnob(state, "ScaledImage", "scale")
    }
}



export default connect(mapStateToProps, () => ({
    init: wb.init
}))(Story)





