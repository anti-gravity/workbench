import * as React from 'react';
export const Banner = ({ children, onClick, title, style }) => (<div style={Object.assign({ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, marginLeft: 32, marginRight: 32 }, style)}>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <div onClick={() => !!onClick ? onClick() : console.log(`/parts`)} style={{ fontSize: 14, fontWeight: 400, cursor: "pointer", paddingRight: 32 }}>
                Pinpoint Parts<sup style={{ marginLeft: 3, fontSize: "10px" }}>Beta</sup>
            </div>
            {!!title &&
    <div style={{ display: "flex", alignItems: "center", height: "100%", paddingLeft: 32, borderLeft: "1px solid #F0F0F0" }}>
                    {title}
                </div>}
        </div>
        {children}
    </div>);
