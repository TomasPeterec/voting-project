import React from 'react';
import './App.css';
import ItemForVoting from './ItemForVoting';
import { useState } from 'react';




const maxPercentForOne = 50
const minPercentForOne = 1 //it must not be absolute zero
const percent100 = 100
const nextFloat = 1

//main counting function
const percentageDistribution = (ar, curentSlider) => {
   
  let ar1 = [...ar] //copiing of array of posibilities
  let countOfAll = 0
  let valueToRatioTo100 = 0 //a ratio with which are uncecked and unselected multiplied 
  let valueOfChecked = 0
  //test22 for testing
  // let count22 = 0

  ar1.forEach((item, index) => {
    //console.log(item.fixed)
    if(item.fixed === true){
      if(index !== curentSlider){
        // console.log('index under condition: '+index)
        valueOfChecked += Number(ar1[index].votingValue)
      }
    }
    // console.log('value of checked: '+valueOfChecked)
    // console.log('index: '+index)
  })


  for(let i = 0; i < ar1.length; i++) {
    countOfAll += Number(ar1[i].votingValue)
  }

  let valueToSubteact = Number(ar1[curentSlider].votingValue) + Number(valueOfChecked)
  valueToRatioTo100 = (percent100-valueToSubteact)/(countOfAll-valueToSubteact)

  for(let i = 0; i < ar1.length ; i++) {

    if(ar1[i].fixed !== true){
      if(i !== curentSlider){
        ar1[i].votingValue = ar1[i].votingValue * valueToRatioTo100
      } 
    }else{
      //console.log(ar1[i].votingValue)
    }
  }

  //this is condition part just for checking if any slider value is not more than maxPercentForOne
  for(let s3 = 0; s3 < ar1.length; s3++) {
    if(ar1[s3].votingValue > maxPercentForOne){
    //test
    // console.log(ar1[s3].votingValue)
    ar1[s3].votingValue = maxPercentForOne
    //test
    // console.log(ar1[s3].votingValue)
      ar1 = percentageDistribution(ar1, s3)
    }else{
      if(ar1[s3].votingValue < minPercentForOne){
        ar1[s3].votingValue = minPercentForOne
        ar1 = percentageDistribution(ar1, s3)
      }
    }
  }

  // //test22 this was just a test if the number of all slider values ​​is 100
  // for(let i = 0; i < ar1.length ; i++) {
  //   count22 = Number(ar1[i].votingValue) + count22
  // }
  // console.log('sum of all: '+count22)

  return ar1
}

function App({possibilities}) {
 // const listOfCheckboxes = possibilities.map(() => false)

  possibilities.forEach((item, index) => {
    if(item.fixed === undefined){
      possibilities[index].fixed = false
    }
  })


  const [copyOfPosibilities, setCopyOfPosibilities] = useState(possibilities)
 // const [checkboxList, setCheckboxList] = useState(listOfCheckboxes)

  

  return (
    <div className="App">
        {
          //main loop which generates the rows
          copyOfPosibilities.map((possibility, i) => 
            <div style={{display: 'inline-flex'}}>
              <ItemForVoting key={i}
                title={possibility.title}
                description={possibility.description}
               // votingValue={copyOfPosibilities[i].votingValue}
              />
              <div style={{display: 'inline-flex'}}>
                <div key={i}>
                  {Math.round(possibility.votingValue * nextFloat) / nextFloat}%
                </div>
              
                <input value={possibility.votingValue} 
                  type="range" 
                  min="0" 
                  max={maxPercentForOne}
                  step="0.0001" 
                  onChange={(event) => {
                    const copy1 = [...copyOfPosibilities]
                    copy1[i].votingValue = event.target.value
                    setCopyOfPosibilities(percentageDistribution(copy1, i))
                  }}
                />
                {/* <input type='checkbox' onChange={() => {
                  let copy222 = [...checkboxList]
                  if (checkboxList[i] === true){
                    copy222[i] = false
                  }else{
                    copy222[i] = true
                  }
                  setCheckboxList(copy222)
                }} /> */}

                <input 
                  type="checkbox"
                  defaultChecked={copyOfPosibilities[i].fixed}
                  onChange={(e) => {
                    const newPossibilities = [...copyOfPosibilities]
                    newPossibilities[i].fixed = e.target.checked
                    //console.log(e.target.checked)
                    //console.log(newPossibilities[i].fixed)
                    //debugger
                    setCopyOfPosibilities(newPossibilities)
                  }} 
                />

              </div>
            </div>
        )}
      
    </div>
  );
  
}

export default App;
