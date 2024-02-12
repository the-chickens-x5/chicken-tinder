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
