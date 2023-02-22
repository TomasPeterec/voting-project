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

  var copyOfPosibilities = listOfPosibilities

  if (firstRun === true) {
    copyOfPosibilities.forEach(item01 => {
      item01.votingValue = initialValue
    })
    setFirstRun(false)
  }

  return (
    <div className="App">
        {copyOfPosibilities.map(item => 
          <ItemForVoting 
            title={item.title}
            description={item.description}
            votingValue={item.votingValue}
          />
        )}
    </div>
  );
}

export default App;
