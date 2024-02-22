import React, { useContext } from "react";
import { FullWidthButton } from "../components/Input/Buttons";
import TextButtonInput from "../components/Input/TextButtonInput";
import { useNavigate } from "react-router-dom";
import CoopContext from "../context/coop-context";

export default function WelcomePage() {
	const navigate = useNavigate();
	const coopContext = useContext(CoopContext);


	async function createGroup() {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/flocks`, {
			method: "POST",
		});
		if (res.status === 201) {
			const info = await res.json();
			coopContext.connectToFlock(info.coop_name);
			navigate(`/flock/${info.coop_name}/join`);
		} else {
			console.error("Failed to create group");
		}
	}

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthButton onClick={createGroup}>Rally my flock</FullWidthButton>
			<TextButtonInput
				placeholder="Or enter coop name to join a flock"
				buttonText="let's go -->"
				onClick={(input) => navigate(`/flock/${input}/join`)}
			/>
		</div>
	);
}
