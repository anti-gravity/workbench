import * as React from 'react';
export function RemoveFromFlow(props) {
    const pe = !!props.pointerEvents ? props.pointerEvents : "auto";
    return (<div style={{ flex: 1, position: "relative", pointerEvents: pe }}>
            <div style={{ height: "100%", width: "100%", position: "absolute", display: "flex" }}>
                {props.children}
            </div>
        </div>);
}
