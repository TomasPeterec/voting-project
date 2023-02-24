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

const initialValue = 100 / listOfPosibilities.length


function App() {
  const [firstRun, setFirstRun] = useState(true)
  if (firstRun === true) {
    listOfPosibilities.forEach(item01 => {
      item01.votingValue = initialValue
    })
    setFirstRun(false)
  }

  const [copyOfPosibilities, setCopyOfPosibilities] = useState(listOfPosibilities)
  

  

 


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
            <button onClick={() => {
              let copy1 = [...copyOfPosibilities]
              copy1[i].votingValue = copy1[i].votingValue -10
              setCopyOfPosibilities(copy1)
              
            }}>-10</button>
            <button onClick={() => {
              let copy1 = [...copyOfPosibilities]
              copy1[i].votingValue = copy1[i].votingValue -1
              setCopyOfPosibilities(copy1)
            
            }}>-1</button>
            <div key={i}>
            {Math.round(copyOfPosibilities[i].votingValue)}
            </div>
            <button onClick={() => {
              let copy1 = [...copyOfPosibilities]
              copy1[i].votingValue = copy1[i].votingValue +1
              setCopyOfPosibilities(copy1)
             
            }}>+1</ button>
            <button onClick={() => {
              let copy1 = [...copyOfPosibilities]
              copy1[i].votingValue = copy1[i].votingValue +10
              setCopyOfPosibilities(copy1)
            
            }}>+10</ button>
          </div>
          </div>
        )}
      
    </div>
  );
  
}

export default App;
