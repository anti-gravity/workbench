import * as React from 'react'
import { connect } from 'react-redux'

import { LabeledCheckbox } from '../..'

interface StateProps {
    unit: any
}

interface DispatchProps {
    changeUnit: (unit: any) => void
}

export const Units: React.SFC<StateProps & DispatchProps> = ({unit, changeUnit}) => (
    <div>
        <div style={{fontSize: 16, color: "#474747", marginBottom: 12}}>Units</div>
        <div style={{display: "flex"}}>
            <div style={{marginRight: 24}}>
                <LabeledCheckbox checked={unit === "mm"} onChange={() => changeUnit("mm")} label="Millimeters"/>
            </div>
            <LabeledCheckbox checked={unit === "in"} onChange={() => changeUnit("in")} label="Inches"/>
        </div>
    </div>
)