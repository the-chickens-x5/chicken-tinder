import React from "react";

export function FullWidthButton(props) {
	return (
		<button
			onClick={props.onClick}
			className="w-full bg-primary text-white p-4 rounded-normal text-normal"
		>
			{props.children}
		</button>
	);
}

export function HalfWidthButton(props) {
	return (
		<button
			onClick={props.onClick}
			className="w-[45%] bg-primary text-white p-4 rounded-normal text-normal"
		>
			{props.children}
		</button>
	);
}

export function SmallButton(props) {
	return (
		<button
			onClick={props.onClick}
			className="w-[20%] bg-primary text-white p-4 rounded-normal text-normal mx-auto"
		>
			{props.buttonText}
		</button>
	);
}

// TODO: Yes and no buttons shouldn't be distinct components, they are
// only used once...
/**
 * right-aligned button with white text
 * @param {string} props.buttonText - Text for the button
 * @param {function} props.onClick - Function to be called when the button is clicked. The current value of the textbox will be passed as an argument
 */
export function YesButton(props) {
	return (
		<div className="flex justify-end w-full h-full">
			<button
				onClick={(input) => props.onClick(input)}
				className="bg-accent_red text-white p-4 rounded-normal text-medium w-95%"
			>
				{props.buttonText}
			</button>
		</div>
	);
}

/**
 * left-aligned button with white text
 * @param {string} props.buttonText - Text for the button
 * @param {function} props.onClick - Function to be called when the button is clicked. The current value of the textbox will be passed as an argument
 */
export function NoButton(props) {
	return (
		<div className="flex justify-start w-full h-full">
			<button
				onClick={(input) => props.onClick(input)}
				className="bg-accent_yellow text-white p-4 rounded-normal text-medium w-95%"
			>
				{props.buttonText}
			</button>
		</div>
	);
}
