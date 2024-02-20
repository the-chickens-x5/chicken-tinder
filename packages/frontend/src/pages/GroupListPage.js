import React from "react";
import { useParams } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";
import { BigText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import toast from "react-hot-toast";

export default function GroupListPage() {
	const params = useParams();

	function copyToClipboardAndNotify(input) {
		navigator.clipboard.writeText(input);
		toast.success("Copied to clipboard!", {
			position: "bottom-right",
		});
	}

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Coop Name: {params.coop_name}</FullWidthText>
			<CopyTextButton
				value={`http://localhost:3000/flock/${params.coop_name}/join/`}
				buttonText="copy invite link"
				onClick={copyToClipboardAndNotify}
				textDisabled={true}
			/>
			<BigText>My Flock</BigText>
			<SmallButton buttonText="let's go -->" />
		</div>
	);
}
