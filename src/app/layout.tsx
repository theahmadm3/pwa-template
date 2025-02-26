import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";

import "../styles/globals.css";

// Configure the font
const comfortaa = Comfortaa({
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: "shoppergetit", // Updated to match your app
	description: "Shopper getit app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
				<meta name="theme-color" content="#3c7fec" />
			</head>
			<body className={`${comfortaa.className} antialiased`}>{children}</body>
		</html>
	);
}
