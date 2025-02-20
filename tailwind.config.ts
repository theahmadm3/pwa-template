import type { Config } from "tailwindcss";

export default {
	content: [
		// "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		// "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				comfortaa: ["Comfortaa", "sans-serif"],
			}
		},
		screens: {
			mobile: { max: "767px" },
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
	},
	plugins: [],
} satisfies Config;
