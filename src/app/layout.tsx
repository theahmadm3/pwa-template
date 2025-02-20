import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: "Shoppergetit",
	description: "A shopping app",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/public/manifest.json" />

				<meta name="theme-color" content="#B63B56" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="antialiased">{children}</body>
		</html>
	);
}
