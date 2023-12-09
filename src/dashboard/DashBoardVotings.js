import React from 'react';
import { useState } from 'react';
import DashBoardMenu from './DashBoardMenu';
import DashBoardStaticTexts from './DashBoardStaticTexts';
import DashBoardVotingItemsCopy from './DashBoardVotingItemsCopy';
import DashBoardVotingsForm from './forms/DashBoardVotingsForm';


function DashBoardVotings() {
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((prevReload) => !prevReload);
  };



  return (
    <>
      <DashBoardMenu/>
      <DashBoardStaticTexts title="Votings" breadcrumb=""/>
      <DashBoardVotingsForm triggerReload={triggerReload}  />
      <DashBoardVotingItemsCopy userId="93" reload={reload} />
    </>
  );
}

export default DashBoardVotings;
