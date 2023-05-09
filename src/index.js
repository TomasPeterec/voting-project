import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FetchByButton from './FetchByButton';



const VOTINGVALUE = 250 / 12
// TODO: convert to uppercase
const DUMMY_POSSIBILIES = [
  {title: "morské prasa", description: "vegetarián denný tvor", votingValue: VOTINGVALUE},
  {title: "škrečok", description: "vrgrtarián nočný tvor", votingValue: VOTINGVALUE},
  {title: "užovka červená", description: "žerie živé tvory, menší had", votingValue: VOTINGVALUE},
  {title: "pytón kráľovský", description: "žerie živé myši, stredný had", votingValue: VOTINGVALUE},
  {title: "papagáj", description: "vegetarian, denný tvor", votingValue: VOTINGVALUE},
  {title: "skunk", description: "treba ho dať operovať a asi trochu smrdí, všežravec", votingValue: VOTINGVALUE},
  {title: "mravce", description: "už sme mali", votingValue: VOTINGVALUE},
  {title: "vakoveverica", description: "všežravec, žerie aj červy, nočný tvor, pár, trochu smrdí", votingValue: VOTINGVALUE},
  {title: "pes", description: "žerie to čo my plus granule, treba chodiť von venčiť", votingValue: VOTINGVALUE},
  {title: "rybička", description: "podľa druhu", votingValue: VOTINGVALUE},
  {title: "leguán zelený", description: "vegetarián, do dvoch metrov", votingValue: VOTINGVALUE},
  {title: "leguán pustinný", description: "skoro vegetarián, 40 cm", votingValue: VOTINGVALUE}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App possibilities={DUMMY_POSSIBILIES}/>
    <FetchByButton/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
