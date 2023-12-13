import React from "react";
import { Box } from "@mui/material";
import mobileWidth from "../../cssAndMaterial/is-device";
import { useMediaQuery } from "@mui/material";

const DVotingItem = ({nameOfVotes}) => {
  //breakpoint
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`); 
  // const writeSomething = (text) => console.log(text)
  const MyBox = () => {
    return(  
      <Box style={{display: "flex"}}
        borderRadius="10px"
        border="1px solid #ccc"
        p={2}
      >
        <div style={{width: "55px"}}>Staus</div>
        {nameOfVotes}
      </Box>
    )
  }

  return(  
    <>
      {isMobile ? (
          <MyBox />
        ):(
          <MyBox />
        )

      }
    </>
  )
}

export default DVotingItem
