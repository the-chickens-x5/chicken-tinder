import React from "react";
import { FullWidthText, BigText } from "../components/Input/Text";
import { HalfWidthButton } from "../components/Input/Buttons";

export default function WinnerPage() {
	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Winner Winner Chicken Dinner!</FullWidthText>
			<BigText>Restaurant Name</BigText>
			<div className="flex justify-between">
				<HalfWidthButton>Return Home</HalfWidthButton>
				<HalfWidthButton>Revote</HalfWidthButton>
			</div>
		</div>
	);
}
