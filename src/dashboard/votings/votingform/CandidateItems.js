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
const minPercentForOne = 0.1; //it must not be absolute zero
const percent100 = 100;
const nextFloat = 100;



//main counting function
const percentageDistribution = (ar, curentSlider, depo) => {
  let depo1 = [...depo];
  let posibilitiesArray = [...ar]; //copiing of array of posibilities
  let countOfAll = 0;
  let valueToRatioTo100 = 0; //a ratio with which are uncecked and unselected multiplied
  let valueOfChecked = 0;
  let totalValueOfVote = 0;

  posibilitiesArray.forEach((item, index) => {
    if (item.fixed === true) {
      if (index !== curentSlider) {
        valueOfChecked += Number(posibilitiesArray[index].votingValue);
      }
    }
  });

  for (let i = 0; i < posibilitiesArray.length; i++) {
    countOfAll += Number(posibilitiesArray[i].votingValue);
  }

  let valueToSubtract = Number(posibilitiesArray[curentSlider].votingValue) + Number(valueOfChecked);
  valueToRatioTo100 = (percent100 - valueToSubtract) / (countOfAll - valueToSubtract);

  for (let i = 0; i < posibilitiesArray.length; i++) {
    if (posibilitiesArray[i].fixed !== true) {
      if (i !== curentSlider) {
        posibilitiesArray[i].votingValue = Number(posibilitiesArray[i].votingValue) * valueToRatioTo100;
      }
    } else {
      posibilitiesArray[i].votingValue = Number(posibilitiesArray[i].fixedValue);
    }
  }

  //this is condition part just for checking if any slider value is not more than maxPercentForOne
  for (let s3 = 0; s3 < posibilitiesArray.length; s3++) {
    if (Number(posibilitiesArray[s3].votingValue) > maxPercentForOne) {
      posibilitiesArray[s3].votingValue = maxPercentForOne;
      posibilitiesArray = percentageDistribution(posibilitiesArray, s3, depo1);
    } else {
      if (Number(posibilitiesArray[s3].votingValue) < minPercentForOne) {
        posibilitiesArray[s3].votingValue = minPercentForOne;
        posibilitiesArray = percentageDistribution(posibilitiesArray, s3, depo1);
      }
    }
  }

  posibilitiesArray.forEach((item) => {
    totalValueOfVote += Number(item.votingValue);
  });

  if (Math.round(totalValueOfVote) !== percent100) {
    posibilitiesArray = depo1;
  }

  return posibilitiesArray;
};

function CandidateItems() {
  const { appState, appStateSetter } = useMainContext();
  const [votingPosibilities, setVotingPosibilities] = useState([]);
  const [currentSlider, setSurrentSlider] = useState(0)

  const normalizeSumTo100 = (floatValue, candidateIndex) => {
    let difference = 0
    let auxliaryValue = Math.round(floatValue * nextFloat) / nextFloat
    let sumToCompare = 0
    let posibilitiesCopy = [...votingPosibilities]
    posibilitiesCopy.map((element, index, array) => {
      sumToCompare += Math.round(element.votingValue * nextFloat) / nextFloat
    }
    )
   
    difference = 100 - sumToCompare

    if(sumToCompare != 100){
      if(candidateIndex == currentSlider.id){
        auxliaryValue += difference
      }else{
      }
    }

    return Math.round(auxliaryValue * nextFloat) / nextFloat
  }


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
    if (item.disabledCheckBox === undefined) {
      votingPosibilities[index].disabledCheckBox = false;
    }
    if (item.fixed === undefined) {
      votingPosibilities[index].fixed = false;
    }
  });

  votingPosibilities.map((item) => {
    let checkedCount = 0;
    votingPosibilities.forEach((item) => {
      if (item.fixed === true) {
        checkedCount++;
      }
    });

    if (checkedCount === votingPosibilities.length - 2) {
      if (item.fixed === false) {
        item.disabledCheckBox = true; // Modify the copied array, not the original state
      }
      return item; // Don't forget to return the item after modification
    } else {
      if (item.fixed === false) {
        item.disabledCheckBox = false; // Modify the copied array, not the original state
      }
      return item; // Don't forget to return the item after modification
    }
  });

  return appState.linkVoted == 'no' && appState.voteSended === '' ? (
    <div className="candidate-container">
      {
        // Main loop which generates the rows
        votingPosibilities.map((candidate, i) => (
          <div key={candidate.title || i} className="candidate-row">
            {' '}
            {/* Unique `key` added here */}
            <div className="candidate-name-row inter-item-title">{candidate.title}</div>
            <div className="candidate-divider"></div>
            <div className="candidate-second-row">
              <div className="candidate-description-row inter-item-description">{candidate.description}</div>
              <div className="slider-nest">
                <input id={i}
                  className="slider"
                  value={candidate.votingValue}
                  type="range"
                  min="0"
                  max={maxPercentForOne}
                  step="0.0001"
                  onChange={(event) => {
                    const copy1 = [...votingPosibilities];
                    if (copy1[i].fixed === false) {
                      copy1[i].votingValue = event.target.value;
                      const result = percentageDistribution(copy1, i, votingPosibilities);
                      setVotingPosibilities(result); setSurrentSlider(event.target);
                    }
                  }}
                />
                <input
                  type="checkbox"
                  defaultChecked={votingPosibilities[i].fixed}
                  onChange={(e) => {
                    const newPossibilities = [...votingPosibilities];
                    if (e.target.checked === true) {
                      newPossibilities[i].fixedValue = newPossibilities[i].votingValue;
                    }
                    newPossibilities[i].fixed = e.target.checked;
                    setVotingPosibilities(newPossibilities);
                  }}
                  disabled={votingPosibilities[i].disabledCheckBox} // Correct usage here
                />
                <div className="inter-item-title">{normalizeSumTo100(candidate.votingValue, i )}%</div>
              </div>
            </div>
          </div>
        ))
      }
      <br />
      <SendingTest votingsResult={votingPosibilities} />
    </div>
  ) : (
    <div>The vote from link sended on the email addres {appState.emailOfVoter} was allready added.</div> // Render something else if the condition is false
  );
}

export default CandidateItems;
