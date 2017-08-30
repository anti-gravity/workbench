import * as React from 'react'
import { Props as CheckboxProps, Checkbox } from './Checkbox'
interface Props extends CheckboxProps {
    label: string
}

export const LabeledCheckbox: React.SFC<Props> = ({onChange, checked, label}) => (
    <div style={{display: "flex", alignItems: "center"}}>
        <Checkbox checked={checked} onChange={onChange}/>
        <div style={{marginLeft: 12, fontSize: 12}}>{label}</div>
    </div>
)