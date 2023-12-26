import React from 'react'
import DashBoardHeader from './dash-board-header'
import { useLocation } from 'react-router-dom'

const DashboardDistribute = () => {
  const location = useLocation()
  const { currentItem, currentId } = location.state

  return (
    <>
      <DashBoardHeader />
      <div>Distribute page</div>
      {currentItem}
      <br />
      {currentId}
    </>
  )
}

export default DashboardDistribute
