import * as React from 'react';
import { LabeledCheckbox } from '../..';
export const Units = ({ unit, changeUnit }) => (<div>
        <div style={{ fontSize: 16, color: "#474747", marginBottom: 12 }}>Units</div>
        <div style={{ display: "flex" }}>
            <div style={{ marginRight: 24 }}>
                <LabeledCheckbox checked={unit === "mm"} onChange={() => changeUnit("mm")} label="Millimeters"/>
            </div>
            <LabeledCheckbox checked={unit === "in"} onChange={() => changeUnit("in")} label="Inches"/>
        </div>
    </div>);
