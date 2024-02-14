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

/**
 * Full width textbox along with a copy link button on the right
 * @param {string} props.buttonText - Text for the button
* @param {function} props.onClick - Function to be called when the button is clicked. The current value of the textbox will be passed as an argument
 */
export function CopyTextButton(props) {
    return (
        <div className="flex flex-row rounded-normal bg-secondary w-full text-normal">
            <div className="flex items-center justify-start w-full text-gray_text p-4 rounded-normal text-normal">
                {props.linkText}
            </div>
            <button
                onClick={(input) => props.onClick(input)}
                className="bg-primary text-white p-4 rounded-normal w-1/5"
            >
                {props.buttonText}
            </button>
        </div>
    );
}

/**
 * 1/6 width right-aligned button with white text
 * @param {string} props.buttonText - Text for the button
* @param {function} props.onClick - Function to be called when the button is clicked. The current value of the textbox will be passed as an argument
 */
export function YesButton(props) {
    return (
        <div className="flex justify-end w-screen h-screen">
            <button
                onClick={(input) => props.onClick(input)}
                className="bg-accent_red text-white p-4 rounded-normal text-medium w-1/2 h-1/2"
            >
                {props.buttonText}
            </button>
        </div>
    );
}

/**
 * 1/6 width left-aligned button with white text
 * @param {string} props.buttonText - Text for the button
* @param {function} props.onClick - Function to be called when the button is clicked. The current value of the textbox will be passed as an argument
 */
export function NoButton(props) {
    return (
        <div className="flex justify-start w-screen h-screen">
            <button
                onClick={(input) => props.onClick(input)}
                className="bg-accent_yellow text-white p-4 rounded-normal text-medium w-1/2 h-1/2"
            >
                {props.buttonText}
            </button>
        </div>
    );
}