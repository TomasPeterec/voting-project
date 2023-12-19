import React from 'react';
import { useState } from 'react';
import DashBoardMenu from './dash-board-menu';
import DashBoardStaticTexts from './dash-board-static-texts';
import DashBoardVotingItems from './dash-board-voting-items';
import DashBoardVotingsForm from './forms/dash-board-votings-form';


function DashBoardVotings() {
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((prevReload) => !prevReload);
  };

  return (
    <>
      <DashBoardMenu/>
      <DashBoardStaticTexts title="Votings" breadcrumb=""/>
      <DashBoardVotingsForm userId="93" triggerReload={triggerReload}  />
      <DashBoardVotingItems userId="93" reload={reload} />
    </>
  );
}

export default DashBoardVotings;
