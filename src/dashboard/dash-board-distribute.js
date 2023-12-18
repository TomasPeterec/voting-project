import React from 'react';
import DashBoardMenu from './dash-board-menu';
import { useLocation } from 'react-router-dom';

const DashboardDistribute = () => {
  const location = useLocation();
  const {currentItem, currentId} = location.state

  return (
    <>
      <DashBoardMenu/>
      <div>Distribute page</div>
      {currentItem}<br/>
      {currentId}
    </>
  );
}

export default DashboardDistribute;
