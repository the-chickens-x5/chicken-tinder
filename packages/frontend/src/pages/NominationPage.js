import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import { BigText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";
import Table from "../components/Table";

export default function NominationPage() {
	const params = useParams();
	const navigate = useNavigate();
	const [restaurants, setRestaurants] = useState([]);

	async function postEggs(title) {
		const result = await fetch(
			`${process.env.REACT_APP_API_URL}/flocks/${params.coop_name}/basket/${title}`,
			{ method: "POST" }
		);
		if (result.ok) {
			setRestaurants((prevRestaurants) => [...prevRestaurants, title]);
		}
		return result;
	}

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coop_name}/basket/`)
			.then((response) => response.json())
			.then((data) => setRestaurants(data))
			.catch((error) => console.error("Error:", error));
	}, [params.coop_name]);

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Put your eggs in the basket</FullWidthText>
			<TextButtonInput
				placeholder="Restaurant Name"
				buttonText="submit"
				onClick={(input) => {
					postEggs(input);
				}}
			/>
			<BigText>The Basket</BigText>
			<SmallButton
				buttonText="let's go -->"
				onClick={() => {
					navigate(`/flock/${params.coop_name}/voting`);
				}}
			/>
		</div>
	);
}
