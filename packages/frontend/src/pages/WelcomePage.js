import React from "react";
import { FullWidthButton } from "../components/Input/Buttons";
import TextButtonInput from "../components/Input/TextButtonInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
	const navigate = useNavigate();

	async function createGroup() {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/flocks`);
		if (res.status === 201) {
			console.log("Group created", res.data);
			navigate(`/flock/${res.data.coop_name}/join`);
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
				onClick={(input) => console.log("Joining group with name", input)}
			/>
		</div>
	);
}
