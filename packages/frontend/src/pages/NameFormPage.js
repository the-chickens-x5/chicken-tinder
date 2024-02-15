import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";

export default function NameFormPage() {
	const navigate = useNavigate();
	const params = useParams();

	// Navigate to welcome page if flock doesn't exist
	fetch(`http://localhost:8000/flocks/${params.coop_name}`)
		.then((response) => response.json())
		.then((data) => {/* no-op. generate component below */})
		.catch((error) => navigate("/"));

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>What's your name?</FullWidthText>
			<TextButtonInput
				placeholder="Chickie McDee"
				buttonText="let's go -->"
				onClick={(input) => navigate(`/flock/${params.coop_name}/lobby/`)}
			/>
		</div>
	);
}
