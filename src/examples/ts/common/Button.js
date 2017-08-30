import * as React from 'react';
import { Spinner } from 'react-activity';
import '../../../../node_modules/react-activity/dist/react-activity.css';
export const Button = ({ label, onClick, spinner = false, disabled = false, color = "#FFF", backgroundColor = "#4F4F4F", width = 160, border = "none", fontSize = 14, height = 44 }) => (<button disabled={spinner ? true : disabled} onClick={onClick} style={{ height, width: spinner ? height : width, backgroundColor, border, borderRadius: 4, cursor: !disabled && !spinner ? "pointer" : "not-allowed", color, fontSize, padding: 0, transition: "width 0.2s" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            {spinner ?
    <Spinner color={color} size={(height / 2) - 10} speed={1}/> :
    label}
        </div>
    </button>);
