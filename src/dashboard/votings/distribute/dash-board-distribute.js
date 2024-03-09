import React, { useState, useEffect } from 'react'
import DashBoardHeader from '../../common/dash-board-header'
import DashBoardStaticTexts from '../../common/dash-board-static-texts'
import DashBoardDistributeItems from './dash-board-distribute-items'
import DashBoardDistributeForm from './dash-board-distribute-form'
import axiosInstance from '../../../axios-instance'
import { styles02 } from '../../../css-and-material/styles-02'
import { useLocation } from 'react-router-dom'
import '../../../css-and-material/basic.css'

const DashBoardDistribute = () => {
  const [getGlobal, setGetGlobal] = useState({
    curentSetOfEmails: '',
    curentItem: '',
    saveModalButtonClicked: false,
    nameOfNewSetOfEmails: '',
    displayedListOfEmails: ''
  })
  const userId = 93

  const setGlobal = (propertyName, propertyValue) => {
    const temporaryObject = { ...getGlobal }
    temporaryObject[propertyName] = propertyValue
    setGetGlobal(temporaryObject)
  }
  useEffect(() => {
    if (getGlobal.saveModalButtonClicked === false) {
      setGlobal('nameOfNewSetOfEmails', '')
    }
  }, [getGlobal.saveModalButtonClicked])

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['X-User-ID'] = userId
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // This ist my current workplace
  const loadEmailsFromDb = async (name) => {
    try {
      // Include 'name' in the URL as a query parameter
      const encodedName = encodeURIComponent(name)
      const response = await axiosInstance.get(`/api/users/mails/curentList/?name=${encodedName}`)

      const data = response.data

      setGlobal('curentSetOfEmails', data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const [arrayOfE, setArrayOfE] = useState([])

  const location = useLocation()
  const { currentItem, currentId } = location.state
  const [reload, setReload] = useState(false)
  const [emails, setEmails] = useState('')
  const [parentClick, setParentClick] = useState(false)

  const triggerReload = () => {
    setReload((prevReload) => !prevReload)
  }

  const handleItemArray = (arr) => {
    setArrayOfE(arr)
  }

  const clearBigArea = () => {
    setEmails('')
  }

  const mainEmailHandler = (newEmails) => {
    let newString = ''
    for (let i = 0; i < newEmails.length; i++) {
      if (i != 0) {
        newString = newString + ', '
      }
      newString = newString + newEmails[i].mail
    }
    setEmails(newString)
  }

  const handleEmails = (newEmails, kk) => {
    loadEmailsFromDb(kk)
    mainEmailHandler(newEmails)
  }

  const handleEmails2 = (newEmails, kk) => {
    loadEmailsFromDb(kk)
    mainEmailHandler(newEmails)
  }

  const pushClickUp = (innerClick) => {
    setParentClick(innerClick)
  }

  const changeParentClick = () => {
    setParentClick(false)
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
            userId={userId}
            triggerReload={triggerReload}
            arrFromItems={arrayOfE}
            curentUuid={currentId}
            loadedEmails={emails}
            pushClickUp={pushClickUp}
            clearBigArea={clearBigArea}
            getGlobal={getGlobal}
            setGlobal={setGlobal}
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
            parentClick={parentClick}
            changeParentClick={changeParentClick}
            handleEmails2={handleEmails2}
            getGlobal={getGlobal}
            setGlobal={setGlobal}
          />
        </div>
      </div>
    </>
  )
}

export default DashBoardDistribute
