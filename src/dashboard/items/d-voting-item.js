import React from "react";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Button } from "@mui/material";
import mobileWidth from "../../css-and-material/is-device";

const DVotingItem = ({ nameOfVotes, handleButtonsModal, handleDeleteItemModal }) => {

  // Breakpoint definition
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  // Handlers of modal window 
  const showModalButtons = () => {
    handleButtonsModal(nameOfVotes)
  }

  const deleteItem = () => {
    handleDeleteItemModal(nameOfVotes)
  }

  // Definition of an item in Votings list 
  const MyBox = ({ onClick }) => {
    return (
      <>
        <Box
          style={{ display: "flex", alignItems: "center", height: "30px" }}
          borderRadius="10px"
          border="1px solid #ccc"
          p={"10px"}
          onClick={onClick}
        >
          <div style={{width: "99%", display: "flex"}}>
            <div style={{ width: "55px" }}>Status</div>
            {nameOfVotes}
          </div>
          <div style={{width: "1%", display: "flex", justifyContent: "flex-end" }}>
            {isMobile ? (
              <></>
            ) : (
              <div style={{display: "flex"}}>
                <Button>Distr</Button>
                <Button>Stats</Button>
                <Button>Edit</Button>
                <Button onClick={deleteItem}>Delete</Button>
              </div>
            )}
          </div>
        </Box>
      </>
    );
  };

  return (
    <>
      {isMobile ? (
        <MyBox onClick={showModalButtons} />
      ) : (
        <MyBox />
      )}
    </>
  );
};

export default DVotingItem;
