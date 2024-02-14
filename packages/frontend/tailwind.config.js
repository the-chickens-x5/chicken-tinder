/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FC8800",
				secondary: "#D9D9D9",
				accent_red: "#FD4C3C",
				accent_yellow: "#FCB000",
				gray_text: "#696767",
				placeholder_text: "#A0A0A0",
				black: "#000000",
			},
			borderRadius: {
				normal: "20px",
			},
			spacing: {
				normal: "60px",
			},
			fontSize: {
				normal: "30px",
				medium: "40px",
				big: "50px",
			},
		},
	},
	plugins: [],
};
