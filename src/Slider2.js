import React from "react";

export default class Slider2 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {defaultValue: props.votingValue}
      }

    // render:
    render(){
        return (
            <div className="Input">
                
                <input type="range" defaultValue={this.state.defaultValue} min="0" max="50" step="0.1"
                    onChange={(e) => Slider2.onChange(e.target.value)}
                />
            </div>
        )
    }
    


    //onChange:
    static onChange(value){
        console.log('value', value);  
    }

}