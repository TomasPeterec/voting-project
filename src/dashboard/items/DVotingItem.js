import React from "react";
import { Box } from "@mui/material";

const DVotingItem = ({nameOfVotes}) => {

  return(  
    <Box
      borderRadius="10px"
      border="1px solid #ccc"
      p={2}
    >
      {nameOfVotes}
    </Box>
  )
}

export default DVotingItem
