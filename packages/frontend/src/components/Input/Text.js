import React from "react";

/**
 * Full width centered text box with secondary background color and gray_text text color
 */
export function FullWidthText(props) {
	return (
		<div name={props.name} className="flex items-center justify-center w-full bg-secondary text-gray_text p-4 rounded-normal text-normal">
			{props.children}
		</div>
	);
}

/**
 * Full width left-aligned text box with secondary background color and gray_text text color
 */
export function LeftAlignText(props) {
	return (
		<div className="flex items-center justify-start w-full bg-secondary text-gray_text p-12 mt-0 rounded-normal text-normal">
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

/**
 * Combined textbox for the tutorial page
 */
export function CombinedText(props) {
	return (
		<div className="items-center w-full bg-secondary text-gray_text rounded-normal">
			<div className="flex justify-center">
				<h2 className="p-4 pt-8 text-medium font-bold">{props.title}</h2>
			</div>
			<div className="justify-start pt-0 pl-24 pr-12 pb-12 text-normal">{props.children}</div>
		</div>
	);
}
