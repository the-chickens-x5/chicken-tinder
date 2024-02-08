/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FC8800",
			},
      borderRadius: {
        'normal': '20px',
      },
      spacing: {
        'normal': '60px',
      },
      fontSize: {
        'normal': '30px',
      }
		},
	},
	plugins: [],
};
