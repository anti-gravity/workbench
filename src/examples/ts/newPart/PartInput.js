import * as React from 'react';
import { TextField } from '..';
export const PartInput = ({ label, onInputChange, value, required, placeholder }) => (<div style={{ display: "flex", flexDirection: "column", marginBottom: 30 }}>
        <div style={{ fontSize: 14, color: "#2B2B2B", display: "flex", marginBottom: 12 }}>{label}{required && <sub style={{ color: "#ec1b2e" }}>*</sub>}</div>
        <TextField placeholder={placeholder} required={required} onChange={onInputChange} value={value}/>
    </div>);
PartInput.defaultProps = {
    required: false
};
