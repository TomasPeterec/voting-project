import React from 'react';
import { useLocation } from 'react-router-dom';
import DashBoardHeader from '../../common/dash-board-header';

const DashboardStats = () => {
  const location = useLocation();
  const { currentItem, currentId } = location.state;

  return (
    <>
      <DashBoardHeader />
      <div>Statistics page</div>
      {currentItem}
      <br />
      {currentId}
    </>
  );
};

export default DashboardStats;
