import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const VOTINGVALUE = 100 / 9
// TODO: convert to uppercase
const DUMMY_POSSIBILIES = [
  {title: "morské prasa", description: "Someting 1", votingValue: VOTINGVALUE},
  {title: "škrečok", description: "Someting 2", votingValue: VOTINGVALUE},
  {title: "užovka červená", description: "Someting 3", votingValue: VOTINGVALUE},
  {title: "papagáj", description: "Someting 4", votingValue: VOTINGVALUE},
  {title: "skunk", description: "Someting 5", votingValue: VOTINGVALUE},
  {title: "mravce", description: "Someting 6", votingValue: VOTINGVALUE},
  {title: "vakoveverica", description: "Someting 7", votingValue: VOTINGVALUE},
  {title: "pes", description: "Someting 8", votingValue: VOTINGVALUE},
  {title: "rybička", description: "Someting 8", votingValue: VOTINGVALUE}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App possibilities={DUMMY_POSSIBILIES}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
