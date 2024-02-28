import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullWidthText, BigText } from "../components/Input/Text";
import { HalfWidthButton } from "../components/Input/Buttons";
import LoadingPage from "./LoadingPage";

export default function WinnerPage() {
	const params = useParams();
	const [winningRestaurant, setWinner] = useState("");

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/decision`)
			.then((response) => {
				if (response.status === 404) {
					return { winner: null };
				} else {
					return response.json();
				}
			})
			.then((data) => {
				setWinner(data.winner);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [params.coopName]);

	return (
		<>
			{winningRestaurant ? (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>Winner Winner Chicken Dinner!</FullWidthText>
					<BigText>{winningRestaurant}</BigText>
					<div className="flex justify-between">
						<HalfWidthButton>Return Home</HalfWidthButton>
						<HalfWidthButton>Revote</HalfWidthButton>
					</div>
				</div>
			) : winningRestaurant === null ? (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>Your eggs have cracked...</FullWidthText>
					<BigText>Decision not available</BigText>
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
