/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			keyframes: {
				shake: {
					'0%': {
						transform: 'translate(3px, 0)',
					},
					'50%': {
						transform: 'translate(-3px, 0)',
					},
					'100%': {
						transform: 'translate(0, 0)',
					},
				},
			},
			animation: {
				shake: 'shake 150ms 2 linear',
			},
		},
	},
	plugins: [],
}
