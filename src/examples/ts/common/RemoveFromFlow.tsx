import * as React from 'react';

/*
    Use case:
    - Wrap SVG elements with RemoveFromFlow that are within a flex box to prevent shrinking issues.
    A feature of flex box is that elements within a element that has the flex css property will grow and shink 
    as long as the elements within the flex box do not have width or height set to a pixel value.
    We had an issue with rendering flex box divs that had a fixed width in one or more of its children
    and SVG elements (which require set width values).
    Usually we size SVG elements with javascript by observing a div's dimensions and then setting the SVG to match.
    By setting position absolute on an element nested within the div we're using to detect size, 
    we ensure that the sizing div may grow and shrink according to the flex box, and not constrained by the size of the SVG.
*/
interface RemoveFromFlowProps extends React.Props<any> {
    pointerEvents?: string
}

export function RemoveFromFlow(props: RemoveFromFlowProps) {
    const pe = !!props.pointerEvents ? props.pointerEvents : "auto"
    return (
        <div style={{flex: 1, position: "relative", pointerEvents: pe}}>
            <div style={{height: "100%", width: "100%", position: "absolute", display: "flex"}}>
                {props.children}
            </div>
        </div>
    )
}