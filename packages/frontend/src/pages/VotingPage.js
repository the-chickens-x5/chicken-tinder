import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import { YesButton, NoButton } from "../components/Input/Buttons";
import LoadingPage from "./LoadingPage";

export default function VotingPage() {
	const [egg, setEgg] = useState(null);

	const params = useParams();
	const navigate = useNavigate();

	const coopName = params.coopName;
	const chick = localStorage.getItem("chickName");

	function postVote(body) {
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${coopName}/${chick}/vote/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		})
			.then((response) => {
				if (response.status === 204) {
					navigate(`/flock/${coopName}/winner/`);
				} else {
					return response.json();
				}
			})
			.then((data) => {
				if (data) {
					setEgg(data.egg);
				}
			})
			.catch((error) => console.error("Error:", error));
	}

	useEffect(postVote, [chick, coopName, navigate]);

	function handleVote(vote) {
		egg.vote = vote;
		const body = JSON.stringify({ egg: egg });

		postVote(body);
	}

	return (
		<>
			{egg ? (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>{egg.title}</FullWidthText>
					<div className="flex items-center justify-between">
						<NoButton buttonText="<-- No" onClick={() => handleVote(-1)} />
						<YesButton buttonText="Yes -->" onClick={() => handleVote(1)} />
					</div>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
}
