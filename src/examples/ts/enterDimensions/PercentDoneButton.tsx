import * as React from 'react'

import { formatFloat } from './helpers'

export function PercentDoneButton({percent, doneLabel, onClick}: {percent: number, doneLabel: string, onClick: () => void}) {
    return <button disabled={percent !== 100} onClick={onClick} style={{height: "44px", width: "160px", backgroundColor: "#4F4F4F", border: "none", borderRadius: "4px", cursor: percent === 100 ? "pointer" : "not-allowed", color: "#FFF", fontSize: "14px"}}>
        { percent !== 100 ? `${formatFloat(percent, 0)}% Solved` : doneLabel }
    </button>
}