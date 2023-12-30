import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Typography, useMediaQuery } from '@mui/material'
import axiosInstance from '../../../axios-instance'
import votingTheme from '../../../css-and-material/theme'
import { testIfItExists } from '../../common/already-exist'

import { styles02 } from '../../../css-and-material/styles-02'
import mobileWidth from '../../../css-and-material/is-device'

const DashBoardEditForm = ({ triggerReload, userId, curentUuid, arrFromItems }) => {
  const [noteBelowTheInput, setNoteBelowTheInput] = useState('Required input')
  const [clicked, setClicked] = useState(false)
  const [formDataTitle, setFormDataTitle] = useState('')
  const [formDataDes, setFormDataDes] = useState('')

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['X-User-ID'] = userId
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (noteBelowTheInput != 'Such name of item is already in the list') {
        if (formDataTitle != '' && formDataTitle != ' ' && formDataTitle != '.' && formDataTitle != ',') {
          const response = await axiosInstance.put('/api/listOfVotings/template', {
            lov_id: curentUuid,
            title: formDataTitle.trim(),
            description: formDataDes.charAt()
          })
          console.log(response.data)
          triggerReload()
          setFormDataTitle('')
          setFormDataDes('')
        }
      }
    } catch (error) {
      console.error('Error:', error.response.data)
    }
  }

  const handleChange = (e) => {
    setFormDataTitle(e.target.value)
    setNoteBelowTheInput(testIfItExists(arrFromItems, 'title', e.target.value.trim()))
  }

  const handleChange2 = (e) => {
    setFormDataDes(e.target.value)
  }

  const handleClickModalOn = () => {
    setClicked(true)
  }

  const handleClickModalOff = () => {
    setClicked(false)
  }

  // breakpoint
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`)

  return (
    <>
      <div style={isMobile ? styles02.separatorFlat : styles02.separatorHigh}></div>
      <div style={isMobile ? styles02.floatedVisible : styles02.floatedHidden}>
        <Button style={styles02.basicButton} onClick={handleClickModalOn} variant="contained">
          PLUS
        </Button>
      </div>
      <div
        style={
          isMobile
            ? !clicked
              ? styles02.desktopFormContainerHidden
              : styles02.displayed
            : styles02.desktopFormContainerVisible
        }
      >
        <div style={{ height: '40%' }}></div>
        <div style={isMobile ? styles02.modalInnerDivMobile : styles02.modalInnerDivDesk}>
          <Box borderRadius="10px" bgcolor="white" border="1px solid #ccc" p={2}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '100%' }}>
                  <Typography sx={votingTheme.typography.formDescription}>The name of the new choice</Typography>
                  <input
                    style={{ width: '100%' }}
                    type="text"
                    name="name"
                    placeholder="Enter Input"
                    value={formDataTitle}
                    onChange={handleChange}
                  />
                  <Typography sx={votingTheme.typography.inputRequired}>{noteBelowTheInput}</Typography>
                  <Typography sx={votingTheme.typography.formDescription}>The description of the new choice</Typography>
                  <textarea
                    style={{ width: '100%' }}
                    rows={4} // Specifies the number of visible text lines
                    cols={150} // Specifies the width of the textarea in characters
                    value={formDataDes} // Specifies the initial value of the textarea
                    placeholder="Enter Input" // Specifies a short hint that describes the expected value of the textarea
                    wrap="soft" // Specifies how the text in the textarea should be wrapped
                    readOnly={false} // Specifies that the textarea is read-only, meaning the user cannot modify its content
                    name="description" // Specifies the name of the textarea, which can be used when submitting a form
                    disabled={false} //  Specifies that the textarea is disabled, meaning the user cannot interact with it
                    minLength={15} // Specifies the minimum number of characters required in the textarea
                    maxLength={200} // Specifies the maximum number of characters allowed in the textarea
                    onChange={handleChange2}
                  />
                </div>
                <div style={{ width: '30px' }}></div>
                <div>
                  <Button type="submit" onClick={handleClickModalOff} variant="contained">
                    PLUS
                  </Button>
                </div>
              </div>
            </form>
          </Box>
        </div>
      </div>
    </>
  )
}

export default DashBoardEditForm
