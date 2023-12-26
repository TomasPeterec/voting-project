import React from 'react'
import DashBoardHeader from './dash-board-header'
import { useLocation } from 'react-router-dom'

const DashboardStats = () => {
  const location = useLocation()
  const { currentItem, currentId } = location.state

  return (
    <>
      <DashBoardHeader />
      <div>Statistics page</div>
      {currentItem}
      <br />
      {currentId}
    </>
  )
}

export default DashboardStats
