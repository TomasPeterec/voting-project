import React, { useState } from 'react'
import DashBoardHeader from './dash-board-header'
import DashBoardStaticTexts from './dash-board-static-texts'
import DashBoardVotingItems from './dash-board-voting-items'
import DashBoardVotingsForm from './forms/dash-board-votings-form'
import { styles02 } from '../css-and-material/styles-02'
import '../css-and-material/basic.css'

function DashBoardVotings() {
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
          <DashBoardStaticTexts title="Votings" breadcrumb="Nejaky skusobny text" />
          <DashBoardVotingsForm userId="93" triggerReload={triggerReload} />
        </div>
      </div>
      <div style={styles02.mainBottomContainer}>
        <div style={styles02.mainContentContainer}>
          <DashBoardVotingItems userId="93" reload={reload} />
        </div>
      </div>
    </>
  )
}

export default DashBoardVotings
