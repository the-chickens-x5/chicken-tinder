import React, { useEffect, useState } from "react";
import { FullWidthText, BigText } from "../components/Input/Text";
import { HalfWidthButton } from "../components/Input/Buttons";

export default function WinnerPage() {
	const [winningRestaurant, setWinningRestaurant] = useState("");

    useEffect(() => {
        async function fetchWinningRestaurant() {
            const result = await getWinningRestaurant();
            setWinningRestaurant(result);
        }
        fetchWinningRestaurant();
    }, []);

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Winner Winner Chicken Dinner!</FullWidthText>
			<BigText>{winningRestaurant}</BigText>
			<div className="flex justify-between">
				<HalfWidthButton>Return Home</HalfWidthButton>
				<HalfWidthButton>Revote</HalfWidthButton>
			</div>
		</div>
	);
}