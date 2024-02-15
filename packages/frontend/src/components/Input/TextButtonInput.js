import React, { useState } from "react";

/**
 * Full width textbox along with a submission button on the right
 * @param {string} props.placeholder - Placeholder text for the textbox
 * @param {string} props.buttonText - Text for the button
 * @param {string} props.value - Initial value of the textbox
 * @param {function} props.onClick - Function to be called when the button is clicked. The current value of the textbox will be passed as an argument
 * @param {boolean} props.textDisabled - Whether the textbox should be disabled (default: false)
 */
export default function TextButtonInput(props) {
	const [input, setInput] = useState(props.value || "");

	return (
		<div className="flex flex-row rounded-normal bg-gray-200 w-full text-normal">
			<input
				type="text"
				placeholder={props.placeholder}
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className="px-3 py-2 w-full bg-gray-200 rounded-normal disabled:text-gray-500"
				disabled={props.textDisabled || false}
			/>
			<button
				onClick={() => props.onClick(input)}
				className="bg-primary text-white p-4 rounded-normal w-1/6"
			>
				{props.buttonText}
			</button>
		</div>
	);
}
