import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullWidthText, BigText } from "../components/Input/Text";
import { HalfWidthButton } from "../components/Input/Buttons";
import LoadingPage from "./LoadingPage";

export default function WinnerPage() {
	const params = useParams();
	const [winningRestaurant, setWinner] = useState("");

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coop_name}/decision`)
			.then((response) => response.json())
			.then((data) => {
				setWinner(data);
			});
	}, [params.coop_name]);

	return (
		<>
			{winningRestaurant ? (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>Winner Winner Chicken Dinner!</FullWidthText>
					<BigText>{winningRestaurant.name}</BigText>
					<div className="flex justify-between">
						<HalfWidthButton>Return Home</HalfWidthButton>
						<HalfWidthButton>Revote</HalfWidthButton>
					</div>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
}
