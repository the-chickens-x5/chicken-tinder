import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import { BigText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";
import Table from "../components/Table";
import CoopContext from "../context/coop-context";
import toast from "react-hot-toast";

export default function NominationPage() {
	const params = useParams();
	const navigate = useNavigate();
	const coopContext = useContext(CoopContext);
	const [restaurants, setRestaurants] = useState([]);

	function giveError() {
		toast.success("Restaurant already added", {
			position: "bottom-right",
		});
	}

	async function postEggs(title) {
		const result = await fetch(
			`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/basket/${title}`,
			{ method: "POST" }
		);
		if (result.status === 201) {
			setRestaurants((prevRestaurants) => [...prevRestaurants, title]);
			return result;
		}
		giveError();
		return false;
	}

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/basket/`)
			.then((response) => response.json())
			.then((data) => setRestaurants(data))
			.catch((error) => console.error("Error:", error));
	}, [params.coopName]);

	useEffect(() => {
		coopContext.connectToFlock(params.coopName);
	});

	useEffect(() => {
		console.log(coopContext.messages);
	}, [coopContext.messages]);

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
			<Table rows={restaurants} />
			<SmallButton
				buttonText="let's go -->"
				onClick={() => navigate(`/flock/${params.coopName}/voting/`)}
			/>
		</div>
	);
}
