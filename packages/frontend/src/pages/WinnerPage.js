import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText, BigText } from "../components/Input/Text";
import { HalfWidthButton } from "../components/Input/Buttons";
import LoadingPage from "./LoadingPage";

export default function WinnerPage() {
	const navigate = useNavigate();
	const params = useParams();

	const [winningRestaurant, setWinner] = useState(null);

	useEffect(() => {
		async function getWinner() {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/decision`
			);
			if (response.status === 404) {
				setWinner("");
			} else {
				const data = await response.json();
				setWinner(data.winner);
			}
		}
		getWinner();
	}, [params.coopName]);

	async function resetEggs() {
		await fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/basket/`, {
			method: "DELETE",
		});
		return false;
	}

	return winningRestaurant === null ? (
		<LoadingPage />
	) : (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>
				{winningRestaurant ? "Winner Winner Chicken Dinner!" : "Your eggs have cracked..."}
			</FullWidthText>
			<BigText>{winningRestaurant ? winningRestaurant : "Decision not available"}</BigText>
			<div className="flex justify-between">
				<HalfWidthButton buttonText="Return Home" onClick={() => navigate("/")} />
				<HalfWidthButton
					buttonText="Start Over"
					onClick={async () => {
						await resetEggs();
						navigate(`/flock/${params.coopName}/nominations/`);
					}}
				/>
			</div>
		</div>
	);
}
