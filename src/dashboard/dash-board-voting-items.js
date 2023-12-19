import React, { useState, useEffect } from 'react';
import DVotingItem from "./items/d-voting-item";
import mobileWidth from '../css-and-material/is-device';
import axiosInstance from '../axios-instance';
import { styles02 } from "../css-and-material/styles-02";
import { useMediaQuery } from '@mui/material';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';


const DashBoardVotingItems = ({ userId, reload }) => {
	
	const [listOfVotes, setListOfVotes] = useState(null);
	const [loading, setLoading] = useState(true);

	const [currentItem, setCurrentItem] = useState("");
	const [currentId, setCurrentId] = useState("");
	const [modalButtonsOn, setModalButtonsOn] = useState(false)
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false)

	// adding of interceptor
	axiosInstance.interceptors.request.use(
		(config) => {
			config.headers['X-User-ID'] = userId;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Breakpoint definition
	const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

	const handleButtonsModal = (itemIdentificators) => {
		setCurrentItem(itemIdentificators.currentItem);
		setCurrentId(itemIdentificators.currentId);
		setModalButtonsOn(true);
	};
	
	const handleDeleteItemModal = (itemIdentificators) => {
		hideModalButtons();
		setModalDeleteConfirmation(true);
		setCurrentItem(itemIdentificators.currentItem);
		setCurrentId(itemIdentificators.currentId);
	};

	const hideModalButtons = () => {
		setModalButtonsOn(false)
	}

	const hideDeleteConfirmation = () => {
		setModalDeleteConfirmation(false)
	}

	const deletePermanently = (item) => {
		deleteVotings(item)
		setModalDeleteConfirmation(false)
	}


	useEffect(() => {
		const fetchData = async () => {
			try {
				// Set loading to true before starting the operation
				setLoading(true);
				
				// api-endpoint for serving the items
				const response = await axiosInstance.get(`/api/listOfVotings/subset`);
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

		// Call the fetchData function
		fetchData(); 

	// Dependency array includes 'setLoading, setListOfVotes'
	}, [setLoading, setListOfVotes, reload, currentItem]); 

	const deleteVotings = async (item) => {
		try{
			// api-endpoint for deleting the item
			const response = await axiosInstance.delete(`/api/listOfVotings/${item}`);
			const data = response.data;
			setCurrentItem("");
			setCurrentId("");
		} catch (error) {
			console.error('Error deleting item data:', error);
		}
	}

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
					{currentItem}
				</h3>
				<div style={{display: "flex", justifyContent: "center"}}>
					<Link to="/votings/distribution" state={{currentItem, currentId}}>
						<Button>Distr</Button>
					</Link>
					<Link to="/votings/statistics" state={{currentItem, currentId}}>
						<Button>Stats</Button>
					</Link>
					<Link to="/votings/edit" state={{currentItem, currentId}}>
						<Button>Edit</Button>
					</Link>
					<Button onClick={() => handleDeleteItemModal({currentItem, currentId})}>Delete</Button>
				</div>
				<div style={{display: "flex", justifyContent: "center"}}>
					<Button onClick={hideModalButtons}>Return</Button>
				</div>
			</div>
		</div>

		{/* Definition of modal window for confirmation of deleting a item */}
		<div style={!modalDeleteConfirmation ? (
			styles02.desktopFormContainerHidden
		):(
			styles02.displayed
		)}>
			<div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center"}}>
				<h3 style={{display: "flex", justifyContent: "center", color: "white"}}>
					{currentItem}
				</h3>
				<div style={{display: "flex", justifyContent: "center"}}>
				<Button onClick={() => deletePermanently(currentId)}>Confirm delete</Button>
				</div>
				<div style={{display: "flex", justifyContent: "center"}}>
					<Button onClick={hideDeleteConfirmation}>Return</Button>
				</div>
			</div>
		</div>

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
									currentItem={vote.name_of_voting} 
									currentId={vote.id} 
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
