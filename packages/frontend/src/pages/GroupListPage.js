import React from "react";
import { useParams } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import { CopyTextButton, SmallButton } from "../components/Input/Buttons";
import { BigText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";

export default function GroupListPage() {
	const params = useParams();

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Coop Name:</FullWidthText>
			<TextButtonInput
				value={`http://localhost:3000/flock/${params.coop_name}/join/`}
				buttonText="copy invite link"
				onClick={(input) => navigator.clipboard.writeText(input)}
				textDisabled={true}
			/>
			<BigText>My Flock</BigText>
			<SmallButton buttonText="let's go -->" />
		</div>
	);
}
