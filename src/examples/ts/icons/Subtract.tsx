import * as React from 'react'

interface Props {
    primary: string
}

export const Subtract: React.SFC<Props> = ({primary}) => (
    <svg viewBox='25 25 50 50' style={{height: "100%"}}>
        <path style={{fill: primary, stroke: primary}} d='M58.905,64.971l-8.947-8.949l-8.863,8.949l-6.023-6.023L44.021,50l-9.035-8.862l6.109-6.108l9.035,9.033l8.861-8.947 l6.023,6.022L56.067,50l8.947,8.947L58.905,64.971z'/>
    </svg>
)