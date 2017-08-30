import * as React from 'react';
import { Point, Icon } from '..';
export const Subtract = ({ x, y, artboard, onClick }) => (<Point icon={<Icon.Subtract primary={"red"}/>} x={x} y={y} iconHeight={8} artboard={artboard} onClick={onClick}/>);
