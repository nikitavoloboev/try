import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		function ({ addUtilities }: any) {
			const newUtilities = {
				".flex-center": {
					display: "flex",
					"align-items": "center",
					"justify-content": "center",
				},
				".shadow": {
					filter: "drop-shadow(2px 8px 4px #05050570)",
				},
				".flex-between": {
					display: "flex",
					"align-items": "center",
					"justify-content": "space-between",
				},
				".border-dark": {
					border: "1px solid #282828",
				},
				".border-light": {
					border: "1px solid #69696951",
				},
				".flex-col": {
					display: "flex",
					"flex-direction": "column",
				},

				".flex-row": {
					display: "flex",
					"flex-direction": "row",
				},
				".button-hover": {
					color: "#F28C28",
					"border-radius": "4px",
					"transition-property": "all",
					"transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
					"transition-duration": "150ms",
					background: "rgb(38 38 38)",
					cursor: "pointer",
				},
			}
			addUtilities(newUtilities, ["responsive", "hover"])
		},
	],
}
export default config
