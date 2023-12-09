import React from 'react';
import DashBoardMenu from './DashBoardMenu';
import DashBoardStaticTexts from './DashBoardStaticTexts';
import DashBoardVotingItemsCopy from './DashBoardVotingItemsCopy';

function DashBoardVotings() {
  return (
    <>
      <DashBoardMenu/>
      <DashBoardStaticTexts title="Votings" breadcrumb=""/>
      <DashBoardVotingItemsCopy userId="93"/>
    </>
  );
}

export default DashBoardVotings;
