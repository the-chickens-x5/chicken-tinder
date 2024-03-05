import React from "react";
import { useNavigate } from "react-router-dom";
import { FullWidthText, CombinedText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";

export default function TutorialPage() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Welcome to Chicken Tinder!</FullWidthText>
			<CombinedText title="The Pecking Order">
				<ol className="list-decimal">
					<li>Log in or create an account</li>
					<li>Create a flock (group) or enter your coop name (group code)</li>
					<li>Enter your name and wait for your fellow chicks (friends) to join</li>
					<li>Submit your eggs (nominations) to the basket (list of options)</li>
					<li>Vote for each option</li>
					<li>Get ready to eat!</li>
				</ol>
			</CombinedText>
			<SmallButton buttonText="let's go -->" onClick={() => navigate(`/welcome`)} />
		</div>
	);
}
