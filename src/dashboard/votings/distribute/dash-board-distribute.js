import React, { useState } from 'react'
import DashBoardHeader from '../../common/dash-board-header'
import DashBoardStaticTexts from '../../common/dash-board-static-texts'
import DashBoardDistributeItems from './dash-board-distribute-items'
import DashBoardDistributeForm from './dash-board-distribute-form'
import { styles02 } from '../../../css-and-material/styles-02'
import { useLocation } from 'react-router-dom'
import '../../../css-and-material/basic.css'

const DashBoardDistribute = () => {
  const [arrayOfE, setArrayOfE] = useState([])

  const location = useLocation()
  const { currentItem, currentId } = location.state
  const [reload, setReload] = useState(false)
  const [emails, setEmails] = useState('')

  const triggerReload = () => {
    setReload((prevReload) => !prevReload)
  }

  const handleItemArray = (arr) => {
    setArrayOfE(arr)
  }

  const handleEmails = (newEmails) => {
    let newString = ''
    for (let i = 0; i < newEmails.length; i++) {
      if (i != 0) {
        newString = newString + ', '
      }
      newString = newString + newEmails[i].mail
    }
    setEmails(newString)
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
          <DashBoardStaticTexts title="Votings" breadcrumb={currentItem + ' - distribution'} urlBack="/votings" />
          <DashBoardDistributeForm
            userId="93"
            triggerReload={triggerReload}
            arrFromItems={arrayOfE}
            curentUuid={currentId}
            loadedEmails={emails}
          />
        </div>
      </div>
      <div style={styles02.mainBottomContainer}>
        <div style={styles02.mainContentContainer}>
          <DashBoardDistributeItems
            userId="93"
            curentVotingId={currentId}
            reload={reload}
            arrHandler={handleItemArray}
            handleEmails={handleEmails}
          />
        </div>
      </div>
    </>
  )
}

export default DashBoardDistribute
