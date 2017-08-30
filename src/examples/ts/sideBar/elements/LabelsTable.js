import * as React from 'react';
import { PinToPadEditer } from './PinToPadEditor';
export const LabelsTable = ({ pads, changePinName, deletePad }) => (<div style={{}}>
        <div style={{ display: "flex", borderBottom: "1px #DFDFDF solid", justifyContent: "space-between", backgroundColor: "#fff", padding: "0 12px 0 12px", boxSizing: "border-box" }}>
            <div style={{ fontSize: 12, fontWeight: 400, width: "30px", marginBottom: 12 }}>Pads</div>
            <div style={{ fontSize: 12, fontWeight: 400, width: "100%", marginBottom: 12 }}>
                <div style={{ paddingLeft: 32 }}>Pins</div>
            </div>
            <div style={{ width: "16px" }}></div>
        </div>
        {pads.length === 0 ?
    <div style={{ height: 32, display: "flex", alignItems: "center", fontSize: 12, marginLeft: 12 }}>Click inside a pad</div>
    : <div style={{ /*maxHeight: "250px",*/ overflow: "auto" }}>
                {pads.map((pad, index) => {
        return (<div key={`${pad.name}-${pad.naturalX}-${pad.naturalY}`} style={{ backgroundColor: index % 2 === 0 ? "white" : "#F9F9F9" }}>
                            <PinToPadEditer pad={pad} onNameChange={changePinName} onDelete={deletePad}/>
                        </div>);
    })}
            </div>}
    </div>);
