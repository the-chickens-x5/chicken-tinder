import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import { YesButton, NoButton } from "../components/Input/Buttons";
import LoadingPage from "./LoadingPage";

export default function VotingPage() {
	const [egg, setEgg] = useState(null);

	const params = useParams();
	const navigate = useNavigate();

	const coopName = params.coop_name;
	const chick = localStorage.getItem("chickName");

	function getRestaurant() {
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${coopName}/${chick}/vote`)
			.then((response) => {
				if (response.status === 204) {
					navigate(`/flock/${coopName}/winner/`);
				}
				return response;
			})
			.then((response) => response.json())
			.then((data) => {
				setEgg(data.egg);
			})
			.catch((error) => {
				console.error("Error getting restaurant", error);
			});
	}

	useEffect(getRestaurant, [chick, coopName, navigate]);

	async function sendVote(vote) {
		egg.vote = vote;

		await fetch(`${process.env.REACT_APP_API_URL}/flocks/${coopName}/${chick}/vote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ egg: egg }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Error sending vote", error);
			});

		getRestaurant();
	}

	return (
		<>
			{egg ? (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>{egg.title}</FullWidthText>
					<div className="flex items-center justify-between">
						<NoButton buttonText="<-- No" onClick={() => sendVote(-1)} />
						<YesButton buttonText="Yes -->" onClick={() => sendVote(1)} />
					</div>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
}
