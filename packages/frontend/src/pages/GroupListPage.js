import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";
import { BigText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import toast from "react-hot-toast";
import CoopContext from "../context/coop-context";
import Table from "../components/Table";

export default function GroupListPage(props) {
	const params = useParams();
	const coopContext = useContext(CoopContext);

	function copyToClipboardAndNotify(input) {
		navigator.clipboard.writeText(input);
		toast.success("Copied to clipboard!", {
			position: "bottom-right",
		});
	}

	useEffect(() => {
		coopContext.connectToFlock(params.coopName);
	}, [params.coopName]);

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Coop Name: {params.coopName}</FullWidthText>
			<TextButtonInput
				value={window.location.href.replace("/lobby", "/join")}
				buttonText="copy invite link"
				onClick={copyToClipboardAndNotify}
				textDisabled={true}
			/>
			<BigText>My Flock</BigText>
			<Table
				rows={props.flock?.chicks ? props.flock.chicks.map((chick) => chick.name) : []}
			/>
			<SmallButton buttonText="let's go -->" onClick={props.nextStep} />
		</div>
	);
}
