import React, { useState } from 'react';
import Slider2 from './Slider2';

const sliderMeasures = {
    width: 200,
    height: 30
}

export default function ItemForVoting(props) {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [votingValue, setVotingValue] = useState(props.votingValue);
    
    return (
        <div style={{display: 'inline-flex', height: '30px'}}>
            <div style={{height: '30px', width: '250px', textAlign: 'left'}}>{title}</div>
            <div style={{height: '30px', width: '500px', textAlign: 'left'}}>{description}</div>
            <div style={{height: '30px', width: '60px', textAlign: 'left', display: 'inline-flex'}}>
                <button onClick={() => setVotingValue(votingValue - 10)}>-10</button>
                <button onClick={() => setVotingValue(votingValue - 1)}>-1</button>
                    {Math.round(votingValue)}
                <button onClick={() => setVotingValue(votingValue + 1)}>+1</ button>
                <button onClick={() => setVotingValue(votingValue + 10)}>+10</ button>
                {/* {Math.round(votingValue)}
                <Slider2 votingValue={votingValue} onChange={() => setVotingValue(this.value, votingValue)}></Slider2> */}
            </div>
        </div>
    );
}

