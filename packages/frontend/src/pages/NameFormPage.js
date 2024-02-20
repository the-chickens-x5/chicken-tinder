import React from "react";
import { useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import { useParams } from "react-router";

export default function NameFormPage() {
	const navigate = useNavigate();
    const params = useParams();

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
