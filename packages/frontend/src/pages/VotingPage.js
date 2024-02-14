import React from "react";
import { FullWidthText } from "../components/Input/Text";
import { YesButton, NoButton } from "../components/Input/Buttons";

export default function VotingPage() {
	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Option #1</FullWidthText>
			<div className="flex items-center justify-between">
				<NoButton buttonText="<-- No" />
				<YesButton buttonText="Yes -->" />
			</div>
		</div>
	);
}
