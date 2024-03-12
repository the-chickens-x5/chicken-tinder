import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
	const [flock, setFlock] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/chicks/`)
			.then((response) => response.json())
			.then((data) => setFlock(data))
			.catch((error) => console.error("Error:", error));
	}, [params.coopName]);

	function copyToClipboardAndNotify(input) {
		navigator.clipboard.writeText(input);
		toast.success("Copied to clipboard!", {
			position: "bottom-right",
		});
	}

	useEffect(() => {
		coopContext.connectToFlock(params.coopName);
	}, [params.coopName]);

    // useEffect(() => {
    //     const handleUpdateFlock = (updatedFlock) => {
    //         setFlock(updatedFlock);
    //     };

    //     // Listen for 'update-flock' event from the server
    //     coopContext.socket.on('join-flock', handleUpdateFlock);

    //     // Clean up the effect by removing the listener
    //     return () => coopContext.socket.off('join-flock', handleUpdateFlock);
    // }, [coopContext.socket]);

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Coop Name: {params.coopName}</FullWidthText>
			<TextButtonInput
				value={`http://localhost:3000/flock/${params.coopName}/join/`}
				buttonText="copy invite link"
				onClick={copyToClipboardAndNotify}
				textDisabled={true}
			/>
			<BigText>My Flock</BigText>
			<Table rows={flock} />
			<SmallButton
				buttonText="let's go -->"
				onClick={props.nextStep}
			/>
		</div>
	);
}
