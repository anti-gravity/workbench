import * as React from 'react';
export const Legend = () => (<div style={{ display: "flex", flexDirection: "column" }}>
        <Item text="Solved Edge" color="#4CC27C"/>
        <Item text="Uncertain Distance" color="#FD5C63" end={true}/>
    </div>);
const Item = ({ color, text, end = false }) => (<div style={{ display: "flex", marginBottom: end ? 0 : 10, alignItems: "center" }}>
        <div style={{ height: 4, width: 20, backgroundColor: color }}></div>
        <div style={{ marginLeft: 8, fontSize: 14 }}>{text}</div>
    </div>);
