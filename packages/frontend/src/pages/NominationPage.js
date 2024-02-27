import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import { BigText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";
import { useParams } from "react-router";
import Table from "../components/Table";

export default function NominationPage() {
	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Put your eggs in the basket</FullWidthText>
			<TextButtonInput
				placeholder="Restaurant Name"
				buttonText="submit"
				onClick={(input) => {
					postEggs(input);
				}}
			/>
			<BigText>The Basket</BigText>
			<SmallButton buttonText="let's go -->" />
		</div>
	);
}
