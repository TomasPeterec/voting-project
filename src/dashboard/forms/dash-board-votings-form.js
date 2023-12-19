import React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import axiosInstance from '../../axios-instance';

import { styles02 } from '../../css-and-material/styles-02';
import mobileWidth from '../../css-and-material/is-device';


const DashBoardVotingsForm = ({triggerReload, userId}) => {
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState('');


  axiosInstance.interceptors.request.use(
		(config) => {
			config.headers['X-User-ID'] = userId;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axiosInstance.post(`/api/listOfVotings`, 
        { name_of_voting: formData}
      );
      console.log(response.data);
      triggerReload()
      setFormData("")
    }catch (error) {
      console.error('Error:', error.response.data);
    }
  }  

  const handleChange = (e) => {
    setFormData(e.target.value)
  }

  const handleClickModalOn = () => {
    setClicked(true);
  };

  const handleClickModalOff = () => {
    setClicked(false);
  };

   //breakpoint
   const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`); 

  return (
    <>
      <div style={isMobile ? (styles02.floatedVIsible):(styles02.floatedHidden)}>
        <Button onClick={handleClickModalOn} variant="contained">
          PLUS
        </Button>
      </div>
      <div style={isMobile ? (
        !clicked ? (
          styles02.desktopFormContainerHidden
        ):(
          styles02.displayed
        )
      ):(
        styles02.desktopFormContainerVisible
      )}>
        <div style={{height: "40%"}}></div>
        <div style={isMobile ? (styles02.modalInnerDivMobile):(styles02.modalInnerDivDesk)}>
          <Box
            borderRadius="10px"
            bgcolor="white"
            border="1px solid #ccc"
            p={2}
          >
            <form onSubmit={handleSubmit} style={{width: "100%"}}>
              <div style={{width: "100%", display: "flex"}}>
                <div style={{width: "100%"}}>
                  <div>
                    The name of the new vote
                  </div>
                  <input style={{width: "100%"}} type="text" name="name" value={formData} onChange={handleChange} />
                  <div>
                    Required Input
                  </div>
                </div>
                <div style={{width: "30px"}}></div>
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

export default DashBoardVotingsForm;
