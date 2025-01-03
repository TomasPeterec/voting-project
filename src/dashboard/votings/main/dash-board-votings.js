import React, { useState } from 'react';
import DashBoardVotingItems from './dash-board-voting-items';
import DashBoardVotingsOldForm from './dash-board-votings-form';
import { styles02 } from '../../../css-and-material/styles-02';
import DashBoardHeader from '../../common/dash-board-header';
import DashBoardStaticTexts from '../../common/dash-board-static-texts';
import '../../../css-and-material/basic.css';

function DashBoardVotingsOld() {
  const uID = 'I99VjupuITgoS7mvvIiIKYxNRxo2';
  const [arrayOfE, setArrayOfE] = useState([]);
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((prevReload) => !prevReload);
  };

  const handleItemArray = (arr) => {
    setArrayOfE(arr);
  };

  return (
    <>
      <div style={styles02.headerBasic}>
        <div style={styles02.mainHeaderContainer}>
          <DashBoardHeader />
        </div>
      </div>
      <div style={styles02.mainUpperContainer}>
        <div style={styles02.mainContentContainer}>
          <DashBoardStaticTexts title="Votings" breadcrumb="&nbsp;" urlBack="" />
          <DashBoardVotingsOldForm userId={uID} triggerReload={triggerReload} arrFromItems={arrayOfE} />
        </div>
      </div>
      <div style={styles02.mainBottomContainer}>
        <div style={styles02.mainContentContainer}>
          <DashBoardVotingItems userId={uID} reload={reload} arrHandler={handleItemArray} />
        </div>
      </div>
    </>
  );
}

export default DashBoardVotingsOld;
