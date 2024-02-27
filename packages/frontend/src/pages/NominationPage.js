import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import { BigText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";

export default function NominationPage() {
	const navigate = useNavigate();
	const params = useParams();
	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Put your eggs in the basket</FullWidthText>
			<TextButtonInput
				placeholder="Restaurant Name"
				buttonText="submit"
				onClick={(input) => console.log("Restaurant name submitted", input)}
			/>
			<BigText>The Basket</BigText>
			<SmallButton 
				buttonText="let's go -->" 
				onClick={() => navigate(`/flock/${params.coop_name}/voting/`)}
			/>
		</div>
	);
}
