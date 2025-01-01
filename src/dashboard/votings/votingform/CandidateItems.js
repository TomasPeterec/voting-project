import React from 'react';
//import "./CandidateItems.css";
import ItemForVoting from './ItemForVoting';
import { useState, useEffect } from 'react';
import SendingTest from './SendingTest';
import '../../../css-and-material/candidate-items.scss'; // Adjust the path if necessary
import { useMainContext } from '../../../contexts/useMainContext'; // Correct path to your context
import axios from 'axios';
import { element } from 'prop-types';

const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

const maxPercentForOne = 75;
const minPercentForOne = 0.01; //it must not be absolute zero
const percent100 = 100;
const nextFloat = 100;

//main counting function
const percentageDistribution = (ar, curentSlider, depo) => {
  let depo1 = [...depo];
  let ar1 = [...ar]; //copiing of array of posibilities
  let countOfAll = 0;
  let valueToRatioTo100 = 0; //a ratio with which are uncecked and unselected multiplied
  let valueOfChecked = 0;
  let total = 0;

  ar1.forEach((item, index) => {
    if (item.fixed === true) {
      if (index !== curentSlider) {
        valueOfChecked += Number(ar1[index].votingValue);
      }
    }
  });

  for (let i = 0; i < ar1.length; i++) {
    countOfAll += Number(ar1[i].votingValue);
  }

  let valueToSubteact = Number(ar1[curentSlider].votingValue) + Number(valueOfChecked);
  valueToRatioTo100 = (percent100 - valueToSubteact) / (countOfAll - valueToSubteact);

  for (let i = 0; i < ar1.length; i++) {
    if (ar1[i].fixed !== true) {
      if (i !== curentSlider) {
        ar1[i].votingValue = Number(ar1[i].votingValue) * valueToRatioTo100;
      }
    } else {
      ar1[i].votingValue = Number(ar1[i].fixedValue);
    }
  }

  //this is condition part just for checking if any slider value is not more than maxPercentForOne
  for (let s3 = 0; s3 < ar1.length; s3++) {
    if (Number(ar1[s3].votingValue) > maxPercentForOne) {
      ar1[s3].votingValue = maxPercentForOne;
      ar1 = percentageDistribution(ar1, s3, depo1);
    } else {
      if (Number(ar1[s3].votingValue) < minPercentForOne) {
        ar1[s3].votingValue = minPercentForOne;
        ar1 = percentageDistribution(ar1, s3, depo1);
      }
    }
  }

  ar1.forEach((item) => {
    total += Number(item.votingValue);
  });

  if (Math.round(total) !== percent100) {
    ar1 = depo1;
  }

  return ar1;
};

function CandidateItems() {
  const { appState, appStateSetter } = useMainContext();
  const [votingPosibilities, setVotingPosibilities] = useState([]);

  useEffect(() => {
    const loadingCandidateList = async () => {
      if (appState.idOfVotesFromMailLink != '') {
        const responseFromIds = await axios.get(
          `${apiUrl}/api/listOfVotings/${appState.idOfVotesFromMailLink}/candidates/${appState.emailIdFromMailLink}`,
        );

        const auxliaryArr = responseFromIds.data.results.map((element) => ({
          title: element.name,
          description: element.description,
          votingValue: 100 / responseFromIds.data.results.length,
          candidateId: element.candidate_id,
        }));

        if (responseFromIds.data.results2[0].voted != 'voted') {
          setVotingPosibilities(auxliaryArr);
        } else {
          setVotingPosibilities([]);
        }
      }
    };

    loadingCandidateList();
  }, [appState.idOfVotesFromMailLink]);

  votingPosibilities.forEach((item, index) => {
    if (item.fixed === undefined) {
      votingPosibilities[index].fixed = false;
    }
  });

  const [copyOfPosibilities, setCopyOfPosibilities] = useState(votingPosibilities);
  const [depositOfPosibilities, setDepositOfPosibilities] = useState(votingPosibilities);

  useEffect(() => {
    setCopyOfPosibilities(votingPosibilities);
    setDepositOfPosibilities(votingPosibilities);
  }, [votingPosibilities]);

  return appState.linkVoted == 'no' && appState.voteSended === '' ? (
    <div className="candidate-container">
      {
        // Main loop which generates the rows
        copyOfPosibilities.map((candidate, i) => (
          <div key={candidate.title || i} className="candidate-row">
            {' '}
            {/* Unique `key` added here */}
            <div className="candidate-name-row inter-item-title">{candidate.title}</div>
            <div className="candidate-divider"></div>
            <div className="candidate-second-row">
              <div className="candidate-description-row inter-item-description">{candidate.description}</div>
              <div className="slider-nest">
                <input
                  className="slider"
                  value={candidate.votingValue}
                  type="range"
                  min="0"
                  max={maxPercentForOne}
                  step="0.0001"
                  onChange={(event) => {
                    const copy1 = [...copyOfPosibilities];
                    if (copy1[i].fixed === false) {
                      copy1[i].votingValue = event.target.value;
                      const result = percentageDistribution(copy1, i, depositOfPosibilities);
                      setDepositOfPosibilities(result);
                      setCopyOfPosibilities(result);
                    }
                  }}
                />
                <input
                  type="checkbox"
                  defaultChecked={copyOfPosibilities[i].fixed}
                  onChange={(e) => {
                    const newPossibilities = [...copyOfPosibilities];
                    if (e.target.checked === true) {
                      newPossibilities[i].fixedValue = newPossibilities[i].votingValue;
                    }
                    newPossibilities[i].fixed = e.target.checked;
                    setCopyOfPosibilities(newPossibilities);
                  }}
                />
                <div className="inter-item-title">{Math.round(candidate.votingValue * nextFloat) / nextFloat}%</div>
              </div>
            </div>
          </div>
        ))
      }
      <br />
      <SendingTest votingsResult={copyOfPosibilities} />
    </div>
  ) : (
    <div>The vote from link sended on the email addres {appState.emailOfVoter} was allready added.</div> // Render something else if the condition is false
  );
}

export default CandidateItems;
