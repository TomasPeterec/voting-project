import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Typography, useMediaQuery } from '@mui/material'
import axiosInstance from '../../../axios-instance'
import votingTheme from '../../../css-and-material/theme'
import { sanitizeForApi } from '../../common/sanitize'

import { styles02 } from '../../../css-and-material/styles-02'
import mobileWidth from '../../../css-and-material/is-device'

const DashBoardDistributeForm = ({ triggerReload, userId, curentUuid }) => {
  const [clicked, setClicked] = useState(false)
  const [formDataMails, setFormDataMails] = useState('')

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
      if (formDataMails != '' && formDataMails != ' ' && formDataMails != '.' && formDataMails != ',') {
        const response = await axiosInstance.post('/api/users/multiplemails', {
          lov_id: curentUuid,
          mails: formDataMails.split(',')
        })
        console.log(response.data)
        triggerReload()
        setFormDataMails('')
      }
    } catch (error) {
      console.error('Error:', error.response.data)
    }
  }

  const handleChange2 = (e) => {
    setFormDataMails(sanitizeForApi(e.target.value))
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
                  <Typography sx={votingTheme.typography.formDescription}>Email addreses</Typography>
                  <textarea
                    style={{ width: '100%', overflowY: 'auto' }}
                    rows={8} // Specifies the number of visible text lines
                    cols={150} // Specifies the width of the textarea in characters
                    value={formDataMails} // Specifies the initial value of the textarea
                    placeholder="Enter Input" // Specifies a short hint that describes the expected value of the textarea
                    wrap="soft" // Specifies how the text in the textarea should be wrapped
                    readOnly={false} // Specifies that the textarea is read-only, meaning the user cannot modify its content
                    name="description" // Specifies the name of the textarea, which can be used when submitting a form
                    disabled={false} //  Specifies that the textarea is disabled, meaning the user cannot interact with it
                    minLength={15} // Specifies the minimum number of characters required in the textarea
                    maxLength={20000} // Specifies the maximum number of characters allowed in the textarea
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

export default DashBoardDistributeForm
