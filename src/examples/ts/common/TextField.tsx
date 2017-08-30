import * as React from 'react'

interface Props {
    value: string
    onChange: (event: React.FormEvent<HTMLInputElement>) => void
    type?: string
    required?: boolean
    placeholder?: string
    style?: React.CSSProperties
}

export const TextField: React.SFC<Props> = ({ onChange, value, type="text", placeholder="", required=false, style={}}) => (
    <input type={type} placeholder={placeholder} required={required} onChange={onChange} value={value} style={{paddingLeft: 16, paddingRight: 16, width: 340, height: 50, borderRadius: 2, border: "0.9px #C6C6C6 solid", fontSize: 14, ...style}}></input>
)