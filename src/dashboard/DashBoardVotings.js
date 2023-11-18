import React from 'react';
import DashBoardMenu from './DashBoardMenu';
import DashBoardTextsOnTop from './DashBoardTextsOnTop';
import DashBoardVotingItemsCopy from './DashBoardVotingItemsCopy';

function DashBoardVotings() {
    return (
        <>
            <DashBoardMenu/>
            <DashBoardTextsOnTop title="Votings" breadcrumb=""/>
            <DashBoardVotingItemsCopy userId="93"/>
        </>
    );
}

export default DashBoardVotings;
