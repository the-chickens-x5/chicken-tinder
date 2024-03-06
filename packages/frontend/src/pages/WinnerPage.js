import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText, BigText } from "../components/Input/Text";
import { HalfWidthButton } from "../components/Input/Buttons";
import LoadingPage from "./LoadingPage";
import NominationPage from "./NominationPage";
import VotingPage from "./VotingPage";

export default function WinnerPage() {
	const navigate = useNavigate();
	const params = useParams();

	const [winningRestaurant, setWinner] = useState("");

	useEffect(() => {
		async function getWinner() {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/decision`
			);
			if (response.status === 404) {
				setWinner(null);
			} else {
				const data = await response.json();
				setWinner(data.winner);
			}
		}
		getWinner();
	}, [params.coopName]);

	return (
		<>
			{winningRestaurant ? (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>Winner Winner Chicken Dinner!</FullWidthText>
					<BigText>{winningRestaurant}</BigText>
					<div className="flex justify-between">
						<HalfWidthButton
							buttonText="Return Home"
							onClick={() => navigate("/")}
						/>
						<HalfWidthButton
                            buttonText="Revote"
                            onClick={async () => {
                                await resetVotes();
                                await resetEggs();
                                navigate(`/flock/${params.coopName}/nominations/`);
                            }}
                        />
					</div>
				</div>
			) : winningRestaurant === null ? (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>Your eggs have cracked...</FullWidthText>
					<BigText>Decision not available</BigText>
					<div className="flex justify-between">
						<HalfWidthButton
							buttonText="Return Home"
							onClick={() => navigate("/")}
						/>
						<HalfWidthButton
                            buttonText="Revote"
                            onClick={async () => {
                                await resetVotes();
                                await resetEggs();
                                navigate(`/flock/${params.coopName}/nominations/`);
                            }}
                        />
					</div>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
}
