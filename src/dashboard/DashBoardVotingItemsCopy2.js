import React from "react";
import DVotingItem from "./items/DVotingItem";

const DashBoardVotingItemsCopy2 = ({user}) => {
    const listOfVotes = [
        {name: "Pet Vote"},
        {name: "Hiking 2023"},
        {name: "Darcek ucitelke"},
        {name: "Nedelny obed"}
    ]

    return(
        <>
            <ul style={{ listStyleType: 'none', padding: "0px" }}>
            {listOfVotes.map((item) => (
                <li key={item.id}>{<DVotingItem nameOfVotes={item.name} />}
                    <div style={{height: "7px"}}></div>
                </li>
            ))}
            </ul>
        </>
    )
}

export default DashBoardVotingItemsCopy2