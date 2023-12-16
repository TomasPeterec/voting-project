import React from "react";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { styles02 } from "../../cssAndMaterial/styles02";
import mobileWidth from "../../cssAndMaterial/is-device";

const DVotingItem = ({ nameOfVotes }) => {
  const [modalButtonsOn, setModalButtonsOn] = useState(false)
  // Breakpoint
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  const MyBox = ({ onClick }) => {
    return (
      <>
        <div style={isMobile ? (
          !modalButtonsOn ? (
            styles02.desktopFormContainerHidden
          ):(
            styles02.displayed
          )
        ):(
          styles02.desktopFormContainerHidden
        )}>
          <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center"}}>
            <h3 style={{display: "flex", justifyContent: "center", color: "white"}}>{nameOfVotes}</h3>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Button>Distr</Button>
              <Button>Stats</Button>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Button onClick={hideModalButtons}>Return</Button>
            </div>
          </div>
        </div>
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
                <Button>Delete</Button>
              </div>
            )}
          </div>
        </Box>
      </>
    );
  };

  const showModalButtons = () => {
    setModalButtonsOn(true)
  }

  const hideModalButtons = () => {
    setModalButtonsOn(false)
  }

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
