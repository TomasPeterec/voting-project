import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardEditOldForm from './dash-board-edit-form';
import DashboardEditOldItems from './dash-board-edit-items';
import { styles02 } from '../../../css-and-material/styles-02';
import DashBoardHeader from '../../common/dash-board-header';
import DashBoardStaticTexts from '../../common/dash-board-static-texts';
import '../../../css-and-material/basic.css';

const DashboardEditOld = () => {
  const uID = 'I99VjupuITgoS7mvvIiIKYxNRxo2';

  const [arrayOfE, setArrayOfE] = useState([]);

  const location = useLocation();
  const { currentItem, currentId } = location.state;
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
          <DashBoardStaticTexts title="Votings" breadcrumb={currentItem + ' - edit'} urlBack="/votings" />
          <DashboardEditOldForm
            userId={uID}
            triggerReload={triggerReload}
            arrFromItems={arrayOfE}
            curentUuid={currentId}
          />
        </div>
      </div>
      <div style={styles02.mainBottomContainer}>
        <div style={styles02.mainContentContainer}>
          <DashboardEditOldItems userId={uID} curentVotingId={currentId} reload={reload} arrHandler={handleItemArray} />
        </div>
      </div>
    </>
  );
};

export default DashboardEditOld;
