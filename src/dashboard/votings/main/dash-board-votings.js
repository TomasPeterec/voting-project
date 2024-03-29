import React, { useState } from 'react'
import DashBoardHeader from '../../common/dash-board-header'
import DashBoardStaticTexts from '../../common/dash-board-static-texts'
import DashBoardVotingItems from './dash-board-voting-items'
import DashBoardVotingsForm from './dash-board-votings-form'
import { styles02 } from '../../../css-and-material/styles-02'
import '../../../css-and-material/basic.css'

function DashBoardVotings() {
  const [arrayOfE, setArrayOfE] = useState([])
  const [reload, setReload] = useState(false)

  const triggerReload = () => {
    setReload((prevReload) => !prevReload)
  }

  const handleItemArray = (arr) => {
    setArrayOfE(arr)
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
          <DashBoardStaticTexts title="Votings" breadcrumb="&nbsp;" urlBack="" />
          <DashBoardVotingsForm userId="93" triggerReload={triggerReload} arrFromItems={arrayOfE} />
        </div>
      </div>
      <div style={styles02.mainBottomContainer}>
        <div style={styles02.mainContentContainer}>
          <DashBoardVotingItems userId="93" reload={reload} arrHandler={handleItemArray} />
        </div>
      </div>
    </>
  )
}

export default DashBoardVotings
