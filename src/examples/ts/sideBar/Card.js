import * as React from 'react';
export const Card = ({ children }) => (<div style={{ display: "flex", flexDirection: "column", borderRadius: 2, border: "1px solid #DFDFDF", padding: 24, backgroundColor: "white", marginBottom: 24 }}>
        {React.Children.map(children, (child, index) => {
    const last = index === React.Children.count(children) || index === 0;
    return (<div>
                    <div style={{ paddingBottom: !last ? 20 : 0, marginBottom: !last ? 20 : 0, borderBottom: !last ? "solid 1px #DFDFDF" : "none", width: 24 }}></div>
                    {child}
                </div>);
})}
    </div>);
