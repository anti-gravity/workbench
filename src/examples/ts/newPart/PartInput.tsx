import * as React from 'react'
import { TextField } from '..'

interface PartInputProps {
    label: string
    onInputChange: (event: React.FormEvent<HTMLInputElement>) => void
    value: string
    placeholder: string
    required?: boolean
}

export const PartInput: React.SFC<PartInputProps> = ({label, onInputChange, value, required, placeholder}) => (
    <div style={{display: "flex", flexDirection: "column", marginBottom: 30}}>
        <div style={{fontSize: 14, color: "#2B2B2B", display: "flex", marginBottom: 12}}>{label}{required && <sub style={{color: "#ec1b2e"}}>*</sub>}</div>
        <TextField placeholder={placeholder} required={required} onChange={onInputChange} value={value} />
    </div>
)

PartInput.defaultProps = {
    required: false
}

