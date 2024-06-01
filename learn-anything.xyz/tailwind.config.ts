import type { Config } from "tailwindcss"
const plugin = require("tailwindcss/plugin")

const config: Config = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			scrollbarHide: {
				"&::-webkit-scrollbar": {
					display: "none",
				},
				"scrollbar-width": "none",
			},
			colors: {
				white: "#ffffff",
				dark: "#0f0f0f",
				darkText: "#f9f9f9",
				softDarkText: "#e4e4e4",
				softDark: "#121212",
				hoverDark: "#1b1b1b",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		function ({ addUtilities }) {
			const newUtilities = {
				".flex-center": {
					display: "flex",
					"align-items": "center",
					"justify-content": "center",
				},
				".shadow": {
					filter: "drop-shadow(2px 8px 4px #05050570)",
				},
				".button": {
					"border-radius": "7px",
					cursor: "pointer",
					background:
						"linear-gradient(180deg, #232323 0%, #222 100%), rgba(255, 255, 255, 0.04)",
					"box-shadow":
						"0px 1px 1px 0px rgba(0, 0, 0, 0.55), 0px 1px 1px 0px rgba(255, 255, 255, 0.05) inset",
				},
				".flex-between": {
					display: "flex",
					"align-items": "center",
					"justify-content": "space-between",
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
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities({
				"col-gap": (value: string) => {
					return {
						display: "flex",
						"flex-direction": "column",
						gap: value,
					}
				},
			})
		}),
	],
}
export default config
