import * as React from 'react';
export const Layer = ({ getArtboard, children, id }) => {
    const artboard = getArtboard();
    return (<div id={id} style={{ position: "absolute", pointerEvents: "none", width: artboard.size.width, height: artboard.size.height, alignSelf: "center" }}>
            {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && typeof child.type === 'function') {
            return React.cloneElement(child, Object.assign({}, child.props, { artboard }));
        }
        return child;
    })}
        </div>);
};
