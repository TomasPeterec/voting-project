import React, { useState } from 'react'
import DashBoardHeader from '../../common/dash-board-header'
import DashBoardStaticTexts from '../../common/dash-board-static-texts'
import DashBoardEditItems from './dash-board-edit-items'
import DashBoardEditForm from './dash-board-edit-form'
import { styles02 } from '../../../css-and-material/styles-02'
import { useLocation } from 'react-router-dom'
import '../../../css-and-material/basic.css'

const DashboardEdit = () => {
  const [arrayOfE, setArrayOfE] = useState([])

  const location = useLocation()
  const { currentItem, currentId } = location.state
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
          <DashBoardStaticTexts title="Votings" breadcrumb={currentItem + ' - edit'} urlBack="/votings" />
          <DashBoardEditForm userId="93" triggerReload={triggerReload} arrFromItems={arrayOfE} curentUuid={currentId} />
        </div>
      </div>
      <div style={styles02.mainBottomContainer}>
        <div style={styles02.mainContentContainer}>
          <DashBoardEditItems userId="93" curentVotingId={currentId} reload={reload} arrHandler={handleItemArray} />
        </div>
      </div>
    </>
  )
}

export default DashboardEdit
