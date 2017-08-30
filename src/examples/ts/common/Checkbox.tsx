import * as React from 'react'

export interface Props {
    checked: boolean
    radio?: boolean
    onChange: (checked: boolean) => void
}

export const Checkbox: React.SFC<Props> = ({checked, onChange, radio=false}) => (
    <div onClick={() => !radio ? onChange(!checked) : !checked ? onChange(true) : {}} style={{height: 24, width: 24, backgroundColor: "#E8E8E8", borderRadius: 2, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>
        { checked &&
            <div style={{backgroundColor: "#686868", width: 16, height: 16}}></div>
        }
    </div>
)