import React, { useState, useEffect } from "react";
import { FullWidthText } from "../components/Input/Text";

export default function Loading() {
	const [text, setText] = useState("The chickens are still quarrelling...");

	useEffect(() => {
		const texts = [
			"The chickens are still quarrelling...",
			"Preparing to fly the coop...",
			"Feathers getting into formation...",
			"Almost ready to wing it...",
		];

		let index = 0;
		const intervalId = setInterval(() => {
			index = index + 1 === texts.length ? 0 : index + 1;
			setText(texts[index]);
		}, 3000); // Change text every 3 seconds

		// Cleanup interval on unmount
		return () => {
			clearInterval(intervalId);
		};
	}, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>{text}</FullWidthText>
		</div>
	);
}
