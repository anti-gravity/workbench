import * as React from 'react';
export function PointIcon({ fill = "#4283F2", opacity = 1 }) {
    return (<svg style={{ height: "100%", opacity }} viewBox="0 0 8 8" version="1.1">
            <circle cx={4} cy={4} r={3} fill={fill}/>
        </svg>);
}
