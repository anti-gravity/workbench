import * as React from 'react'

export function Pin({fill = "#000", focus = false}) {

    return (
        <svg style={{fill: fill, height: "100%"}} viewBox="0 0 24 24">
            <defs>
                <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id={`abcd123`}>
                    <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.729411765   0 0 0 0 0  0 0 0 1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
                    <feMerge>
                        <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </defs>
            <g>
                <path filter={focus ? `url(#abcde)` : ""} d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                <path filter={focus ? `url(#abcde)` : ""} d="M0 0h24v24H0z" fill="none"/>
            </g>
        </svg>
    )
}