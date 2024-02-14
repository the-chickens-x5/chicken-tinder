import React from "react";
import { useParams } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import { CopyTextButton, SmallButton } from "../components/Input/Buttons";
import { BigText } from "../components/Input/Text";

export default function GroupList() {
	const params = useParams();

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Coop Name:</FullWidthText>
			<CopyTextButton
				displayText={`http://localhost:3000/flock/${params.coop_name}/join/`}
				buttonText="copy invite link"
				onClick={(input) => console.log("Invite link copied to clipboard", input)}
			/>
			<BigText>My Flock</BigText>
			<SmallButton buttonText="let's go -->" />
		</div>
	);
}