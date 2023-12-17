import React, { useState, useEffect } from 'react';
import DVotingItem from "./items/DVotingItem";
import axios from 'axios';
import { useMediaQuery } from '@mui/material';
import { styles02 } from "../cssAndMaterial/styles02";
import mobileWidth from '../cssAndMaterial/is-device';
import { Button } from "@mui/material";


const DashBoardVotingItems = ({ userId, reload }) => {
	const [listOfVotes, setListOfVotes] = useState(null);
	const [loading, setLoading] = useState(true);

	const [curentItem, setCurentItem] = useState("");
	const [modalButtonsOn, setModalButtonsOn] = useState(false)
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false)

	// Breakpoint definition
	const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

	const handleButtonsModal = (itemName) => {
		setCurentItem(itemName);
		setModalButtonsOn(true);
	};
	
	const handleDeleteItemModal = (itemName) => {
		hideModalButtons();
		// setModalDeleteConfirmation(true);
		setCurentItem(itemName);
	};

	const hideModalButtons = () => {
		setModalButtonsOn(false)
	}


	useEffect(() => {
		const fetchData = async () => {
			try {
				// Set loading to true before starting the operation
				setLoading(true);
				
				// api-endpoint for serving the items
				const response = await axios.get(`${process.env.REACT_APP_API_ROOT_VAR}/api/listOfVotings/${userId}`);
				const data = response.data;
				// Set data and loading to false when the operation is complete
				setListOfVotes(data);
				setLoading(false);

			} catch (error) {
				// Handle errors if needed
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		};

		fetchData(); // Call the fetchData function

	}, [setLoading, setListOfVotes, reload]); // Dependency array includes 'setLoading, setListOfVotes'

	return (
		<>
		{/* Definition of modal window for buttons */}
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
            <h3 style={{display: "flex", justifyContent: "center", color: "white"}}>
              {curentItem}
            </h3>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Button>Distr</Button>
              <Button>Stats</Button>
              <Button>Edit</Button>
              <Button onClick={() => handleDeleteItemModal(curentItem)}>Delete</Button>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Button onClick={hideModalButtons}>Return</Button>
            </div>
          </div>
        </div>

        {/* Definition of modal window for confirmation of deleting a item */}
		<div>
			{loading ? (
				// Render the loader when loading is true
				<p>Loading...</p>
			) : (
				// Render your component content when loading is false
				<div>
					<ul style={{ listStyleType: 'none', padding: "0px" }}>
						{listOfVotes.slice().reverse().map((vote, index) => (
							<li key={index}>{
								<DVotingItem 
									handleButtonsModal={handleButtonsModal} 
									handleDeleteItemModal={handleDeleteItemModal} 
									nameOfVotes={vote.name_of_voting} 
								/>} 
								<div style={{height: "7px"}}></div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
		</>
	);
};

export default DashBoardVotingItems;
