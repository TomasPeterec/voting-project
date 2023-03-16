import React from 'react';
import './App.css';
import ItemForVoting from './ItemForVoting';
import { useState } from 'react';


const maxPercentForOne = 50
const minPercentForOne = 1 //it must not be absolute zero
const percent100 = 100
const nextFloat = 1

//main counting function
const percentageDistribution = (ar, curentSlider, depo) => {
  //console.log(depo)
  let depo1 = [...depo] 
  let ar1 = [...ar] //copiing of array of posibilities
  let countOfAll = 0
  let valueToRatioTo100 = 0 //a ratio with which are uncecked and unselected multiplied 
  let valueOfChecked = 0
  let total = 0

  ar1.forEach((item, index) => {
    if(item.fixed === true){
      if(index !== curentSlider){
        valueOfChecked += Number(ar1[index].votingValue)
      }
    }
  })

  for(let i = 0; i < ar1.length; i++) {
    countOfAll += Number(ar1[i].votingValue)
  }

  let valueToSubteact = Number(ar1[curentSlider].votingValue) + Number(valueOfChecked)
  valueToRatioTo100 = (percent100-valueToSubteact)/(countOfAll-valueToSubteact)

  for(let i = 0; i < ar1.length ; i++) {
    if(ar1[i].fixed !== true){
      if(i !== curentSlider){
        ar1[i].votingValue = Number(ar1[i].votingValue) * valueToRatioTo100
      } 
    }else{
      ar1[i].votingValue = Number(ar1[i].fixedValue)
    }
  }

  //this is condition part just for checking if any slider value is not more than maxPercentForOne
  for(let s3 = 0; s3 < ar1.length; s3++) {
    if(Number(ar1[s3].votingValue) > maxPercentForOne){
      ar1[s3].votingValue = maxPercentForOne
      ar1 = percentageDistribution(ar1, s3, depo1)
    }else{
      if(Number(ar1[s3].votingValue) < minPercentForOne){
        ar1[s3].votingValue = minPercentForOne
        ar1 = percentageDistribution(ar1, s3, depo1)
      }
    }
  }

  ar1.forEach((item) => {
    total += Number(item.votingValue)
  })

  if(Math.round(total) !== percent100){
   ar1 = depo1
  }

  return ar1
}

function App({possibilities}) {


  possibilities.forEach((item, index) => {
    if(item.fixed === undefined){
      possibilities[index].fixed = false
    }
  })

  const [copyOfPosibilities, setCopyOfPosibilities] = useState(possibilities)
  const [depositOfPosibilities, setDepositOfPosibilities] = useState(possibilities)
  

  return (
    <div className="App">
        {
          //main loop which generates the rows
          copyOfPosibilities.map((possibility, i) => 
            <div style={{display: 'inline-flex'}}>
              <ItemForVoting key={i}
                title={possibility.title}
                description={possibility.description}
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
                    if(copy1[i].fixed === false){
                      copy1[i].votingValue = event.target.value
                      const result = percentageDistribution(copy1, i, depositOfPosibilities)
                      setDepositOfPosibilities(result)
                      setCopyOfPosibilities(result)
                    }
                  }}
                />
                <input 
                  type="checkbox"
                  defaultChecked={copyOfPosibilities[i].fixed}
                  onChange={(e) => {
                    const newPossibilities = [...copyOfPosibilities]
                    if(e.target.checked === true){
                      newPossibilities[i].fixedValue = newPossibilities[i].votingValue
                    }
                    newPossibilities[i].fixed = e.target.checked
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
