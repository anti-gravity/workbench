import * as React from 'react';
export const Triangle = ({ direction, color = "#4283F2", style = {} }) => {
    const left = {
        width: 0,
        height: 0,
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        borderRight: `4px solid ${color}`
    };
    const up = {
        width: 0,
        height: 0,
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderBottom: `4px solid ${color}`
    };
    const down = {
        width: 0,
        height: 0,
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: `4px solid ${color}`
    };
    const tri = direction === "left" ? left : direction === "down" ? down : up;
    return (<div style={Object.assign({}, tri, style)}></div>);
};
