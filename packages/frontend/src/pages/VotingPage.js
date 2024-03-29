import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import { YesButton, NoButton } from "../components/Input/Buttons";
import LoadingPage from "./LoadingPage";
import { toast } from "react-hot-toast";
import AuthContext from "../context/auth-context";
import { useTimer } from "react-timer-hook";

export default function VotingPage() {
	const [egg, setEgg] = useState(null);
	const [gifUrl, setGifUrl] = useState(null);

	const [done, setDone] = useState(false);

	const params = useParams();
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	const coopName = params.coopName;
	const chick = localStorage.getItem("chickName");

	function postVote(body) {
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${coopName}/${chick}/vote/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			},
			body: body,
		})
			.then((response) => {
				if (response.status === 204) {
					setDone(true);
				} else {
					return response.json();
				}
			})
			.then((data) => {
				if (data) {
					setEgg(data.egg);
					setGifUrl(data.gifUrl);
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

	// set timer
	const { seconds, restart } = useTimer({
		expiryTimestamp: new Date(),
		onExpire: () => handleVote(0),
	});

	useEffect(() => {
		const newExpiryTimestamp = new Date();
		newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + 5);
		restart(newExpiryTimestamp);
	}, [egg]);

	// toast timer visuals
	useEffect(() => {
		if (seconds < 4 && seconds > 0) {
			toast(`${seconds} seconds remaining`, {
				duration: 1000,
				position: "top-right",
			});
		}
	}, [seconds]);

	return (
		<>
			{egg && !done ? (
				<div className="flex flex-col space-y-normal justify-center w-5/6 h-[550px]">
					<FullWidthText name="egg">{egg.title}</FullWidthText>
					<div className="flex flex-row justify-between h-full">
						<NoButton buttonText="<-- No" onClick={() => handleVote(-1)} />
						<div className="flex flex-col space-y-normal justify-center w-full">
							{gifUrl && <img className="rounded-normal" src={gifUrl} alt="gif" />}
						</div>
						<YesButton buttonText="Yes -->" onClick={() => handleVote(1)} />
					</div>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
}
