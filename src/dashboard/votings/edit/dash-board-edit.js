import React, { useState } from 'react'
import DashBoardHeader from '../../common/dash-board-header'
import DashBoardStaticTexts from '../../common/dash-board-static-texts'
import DashBoardVotingItems from '../main/dash-board-voting-items'
import DashBoardEditForm from '../main/dash-board-votings-form'
import { styles02 } from '../../../css-and-material/styles-02'
import { useLocation } from 'react-router-dom'
import '../../../css-and-material/basic.css'

const DashboardEdit = () => {
  const location = useLocation()
  const { currentItem, currentId } = location.state
  const [reload, setReload] = useState(false)

  const triggerReload = () => {
    setReload((prevReload) => !prevReload)
  }

  return (
    <>
      <div style={styles02.headerBasic}>
        <div style={styles02.mainHeaderContainer}>
          <DashBoardHeader />
        </div>
      </div>
      <div style={styles02.mainUpperContainer}>
        <div style={styles02.mainContentContainer}>
          <DashBoardStaticTexts title="Votings" breadcrumb={currentItem} urlBack="/votings" />
          <DashBoardEditForm userId="93" triggerReload={triggerReload} />
        </div>
      </div>
      <div style={styles02.mainBottomContainer}>
        <div style={styles02.mainContentContainer}>
          {currentId}
          <DashBoardVotingItems userId="93" reload={reload} />
        </div>
      </div>
    </>
  )
}

export default DashboardEdit
