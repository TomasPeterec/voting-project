import React from 'react';
import { useState } from 'react';

export default function Slider(props) {
    const[sValue, setSValue] = useState(props.sValue);
    const[width, setWidth] = useState(props.width);
    const[height, setHeight] = useState(props.height);
    const[leftmargin, setLeftmargin] = useState((width - height)/2);
    const[rightmargin, setRightmargin] = useState((width - height)/2);

    // const[width2, setWidth2] = useState('300px')
    // const[height2, setHeight2] = useState('20px');
    // const[leftmargin2, setLeftmargin2] = useState('140px');
    // const[rightmargin2, setRightmargin2] = useState('140px');



    return(
        <div style={{display: 'inline-flex', backgroundColor: 'blue', width: {width}, height: {height}}}>
            <div style={{backgroundColor: 'gray', height: {height}, width: '140px'}}></div>
            <div style={{backgroundColor: 'red', height: {height}, width: '20px' }}></div>
            <div style={{backgroundColor: 'gray', height: {height}, width: '140px' }}></div>
        </div> 
    );
}