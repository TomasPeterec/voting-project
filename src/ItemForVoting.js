import React from "react";

export default function ItemForVoting(props) {
  
    return (
        <div style={{display: 'inline-flex', height: '30px'}}>
            <div style={{height: '30px', width: '250px', textAlign: 'left'}}>{props.title}</div>
            <div style={{height: '30px', width: '500px', textAlign: 'left'}}>{props.description}</div>
           
        </div>
    );
}

