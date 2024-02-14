import React from "react";

/**
 * Full width text box with secondary background color and gray_text text color
 */
export function FullWidthText(props) {
	return (
		<div className="flex items-center justify-center w-full bg-secondary text-gray_text p-4 rounded-normal text-normal">
			{props.children}
		</div>
	);
}

/**
 * Centered black text with big font
 */
export function BigText(props) {
	return (
		<div className="flex items-center justify-center text-black text-big font-bold">
			{props.children}
		</div>
	);
}
