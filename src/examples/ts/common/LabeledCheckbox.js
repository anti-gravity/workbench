import * as React from 'react';
import { Checkbox } from './Checkbox';
export const LabeledCheckbox = ({ onChange, checked, label }) => (<div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox checked={checked} onChange={onChange}/>
        <div style={{ marginLeft: 12, fontSize: 12 }}>{label}</div>
    </div>);
