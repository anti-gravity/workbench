import * as React from 'react';
export class Fills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameWidth: 0,
            nameHeight: 0
        };
    }
    render() {
        const fontSize = 12;
        const { scale, zoom, polygons, iconHeight, artboard: { size: { width, height } }, onClick, enabled, rectangularNames } = this.props;
        return (<svg style={{ width, height }}>
                {polygons.map(polygon => (<Fill key={`${polygon.name}`} polygon={polygon} scale={scale} zoom={zoom} onClick={onClick} enabled={enabled} rectangluar={rectangularNames.some(name => name === polygon.name)}/>))}
            </svg>);
    }
}
Fills.defaultProps = {
    iconHeight: 10
};
const Fill = ({ polygon, scale, zoom, onClick, enabled, rectangluar, iconHeight = 10 }) => {
    const centerX = polygon.pts.map(pt => {
        return (pt.imgXY[0] * scale * zoom);
    }).reduce((prev, curr, index, arr) => { return prev + curr; }) / polygon.pts.length;
    const centerY = polygon.pts.map(pt => {
        return (pt.imgXY[1] * scale * zoom);
    }).reduce((prev, curr, index, arr) => { return prev + curr; }) / polygon.pts.length;
    const top = polygon.pts[0].imgXY[1] * scale * zoom;
    const left = polygon.pts[0].imgXY[0] * scale * zoom;
    const points = polygon.pts.reduce((points, pt) => (points += `${pt.imgXY[0] * scale * zoom},${pt.imgXY[1] * scale * zoom} `), "");
    //console.log(points)
    return (<g onClick={() => enabled && onClick(polygon)} style={{ pointerEvents: enabled ? "auto" : "none" }}>
            <polygon points={points} style={{ opacity: 0.5, fill: "#4283F2", cursor: enabled ? "pointer" : "default" }}/>
            <text x={centerX} y={centerY} fontSize={12} textAnchor="middle" fill="white" dy={4}>
                {polygon.name}
            </text>
            {rectangluar &&
        <path style={{ textIndent: 0, textTransform: 'none', blockProgression: 'tb', fill: "white", stroke: "white", strokeWidth: "4px", transform: `translate(${-1 + left}px, ${-191 + top}px) scale(0.20)` }} d='m 27.854206,967.38438 a 0.99849702,0.99933691 0 0 0 -0.873597,1.03046 l 0,10.99161 -10.982369,0 a 0.99849702,0.99933691 0 1 0 0,1.99847 l 11.980766,0 a 0.99849702,0.99933691 0 0 0 0.998397,-0.99924 l 0,-11.99084 a 0.99849702,0.99933691 0 0 0 -1.123197,-1.03046 z m 43.929476,0 a 0.99849702,0.99933691 0 0 0 -0.873597,1.03046 l 0,11.99084 a 0.99849702,0.99933691 0 0 0 0.998397,0.99924 l 11.980766,0 a 0.99849702,0.99933691 0 1 0 0,-1.99847 l -10.982369,0 0,-10.99161 a 0.99849702,0.99933691 0 0 0 -1.123197,-1.03046 z m -39.998287,24.01291 a 0.99849702,0.99933691 0 0 0 -0.811197,0.99924 l 0,19.98477 a 0.99849702,0.99933691 0 0 0 0.998397,0.9992 l 35.942298,0 a 0.99849702,0.99933691 0 0 0 0.998398,-0.9992 l 0,-19.98477 a 0.99849702,0.99933691 0 0 0 -0.998398,-0.99924 l -35.942298,0 a 0.99849702,0.99933691 0 0 0 -0.1872,0 z m 1.185597,1.99847 33.945504,0 0,17.98624 -33.945504,0 0,-17.98624 z M 15.81104,1023.3729 a 1.0027751,1.0036186 0 1 0 0.1872,1.9985 l 10.982369,0 0,10.9916 a 0.99849702,0.99933691 0 1 0 1.996794,0 l 0,-11.9909 a 0.99849702,0.99933691 0 0 0 -0.998397,-0.9992 l -11.980766,0 a 0.99849702,0.99933691 0 0 0 -0.1872,0 z m 55.910243,0 a 0.99849702,0.99933691 0 0 0 -0.811198,0.9992 l 0,11.9909 a 0.99849702,0.99933691 0 1 0 1.996794,0 l 0,-10.9916 10.982369,0 a 0.99849702,0.99933691 0 1 0 0,-1.9985 l -11.980766,0 a 0.99849702,0.99933691 0 0 0 -0.187199,0 z' overflow='visible'/>}
        </g>);
};
