import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";

export default function NameFormPage(props) {
	const navigate = useNavigate();
	const params = useParams();

	// if the user is already in the flock, navigate to the lobby
	if (props.chick) {
		navigate(`/flock/${params.coop_name}/lobby/`);
	}

	// Navigate to welcome page if flock doesn't exist
	fetch(process.env.REACT_APP_API_URL + `/flocks/${params.coop_name}`)
		.then((response) => response.json())
		.then((data) => {
			/* no-op. generate component below */
		});
	// .catch((error) => navigate("/"));

	async function addChick(name, setChick) {
		const result = await fetch(
			process.env.REACT_APP_API_URL + `/flocks/${params.coop_name}/chicks`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: name }),
			}
		);

		if (result.status === 400) {
			console.error("Chick already exists");
			return false;
		} else {
			setChick(name);
			return true;
		}
	}

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>What's your name?</FullWidthText>
			<TextButtonInput
				placeholder="Chickie McDee"
				buttonText="let's go -->"
				onClick={async (input) => {
					if (await addChick(input, props.setChick)) {
						navigate(`/flock/${params.coop_name}/lobby/`);
					}
				}}
			/>
		</div>
	);
}
