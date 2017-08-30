import * as React from 'react'
import { connect } from 'react-redux'
import { LabeledCheckbox } from '../..'

interface StateProps {
    tool: any
}

interface DispatchProps {
    changeTool: (unit: any) => void
}

export const Corrections: React.SFC<StateProps & DispatchProps> = ({tool, changeTool}) => (
    <div>
        <div style={{fontSize: 16, color: "#474747", marginBottom: 12}}>Correction Tools</div>
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{marginBottom: 12}}>
                <LabeledCheckbox checked={tool === "rectangle"} onChange={() => changeTool("rectangle")} label="Force Rectangle"/>
                <div style={{fontSize: 12, fontWeight: 300, marginTop: 12, lineHeight: "16px"}}>Click on a pad that should be a rectangle.</div>
            </div>
            <div>
                <LabeledCheckbox checked={tool === "subtract"} onChange={() => changeTool("subtract")} label="Subtract Area"/>
                <div style={{fontSize: 12, fontWeight: 300, marginTop: 12, lineHeight: "16px"}}>Click areas in the image that should not be part of a pad.</div>
            </div>
        </div>
    </div>
)