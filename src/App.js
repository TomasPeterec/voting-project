import React from 'react';
import './App.css';
import ItemForVoting from './ItemForVoting';
import { useState } from 'react';


const listOfPosibilities = [
  {title: "morské prasa", description: "Someting 1", votingValue: 0},
  {title: "škrečok", description: "Someting 2", votingValue: 0},
  {title: "užovka červená", description: "Someting 3", votingValue: 0},
  {title: "korela", description: "Someting 4", votingValue: 0},
  {title: "skunk", description: "Someting 5", votingValue: 0},
  {title: "mravce", description: "Someting 6", votingValue: 0},
  {title: "vakoveverica", description: "Someting 7", votingValue: 0}
]

const maxPercentForOne = 50
const minPercentForOne = 1
const percent100 = 100
const nextFloat = 1
const initialValue = percent100 / listOfPosibilities.length


function App() {
  const [firstRun, setFirstRun] = useState(true)
  if (firstRun === true) {
    listOfPosibilities.forEach(item01 => {
      item01.votingValue = initialValue
    })
    setFirstRun(false)
  }

  const [copyOfPosibilities, setCopyOfPosibilities] = useState(listOfPosibilities)

  const percentageDistribution = (ar, curentSlider) => {
   
    var ar1 = [...ar]
    var countOfAll = 0
    var valueToRatioTo100 = 0
    //test22 for testing
    // var count22 = 0
  

    for(let i = 0; i < ar1.length; i++) {
      countOfAll = Number(ar1[i].votingValue) + countOfAll
    }
 
    valueToRatioTo100 = (percent100-ar1[curentSlider].votingValue)/(countOfAll-ar1[curentSlider].votingValue)


    for(let i = 0; i < ar1.length ; i++) {
      if(i !== curentSlider){
        ar1[i].votingValue = ar1[i].votingValue * valueToRatioTo100
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

    //test22 this was just a test if the number of all slider values ​​is 100
    // for(let i = 0; i < ar1.length ; i++) {
    //   count22 = Number(ar1[i].votingValue) + count22
    // }
    // console.log(count22)

    return ar1
   
  }

  return (
    <div className="App">
        {
          
          copyOfPosibilities.map((item, i) => 
          <div style={{display: 'inline-flex'}}>
            <ItemForVoting key={i}
              title={item.title}
              description={item.description}
              votingValue={copyOfPosibilities[i].votingValue}
              
            />
          <div style={{display: 'inline-flex'}}>
            <div key={i}>
            {Math.round(copyOfPosibilities[i].votingValue*nextFloat)/nextFloat}%
            </div>
           
            <input value={copyOfPosibilities[i].votingValue} 
              type="range" 
              min="0" 
              max={maxPercentForOne}
              step="0.0001" 
              onChange={(event) => {
                let copy1 = [...copyOfPosibilities]
                copy1[i].votingValue = event.target.value
                copy1 = percentageDistribution(copy1,i)
                setCopyOfPosibilities(copy1)
              }}
            />
          </div>
          </div>
        )}
      
    </div>
  );
  
}

export default App;
