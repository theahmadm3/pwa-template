import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Your App",
	description: "Your app description",
	manifest: "/manifest.json",
	themeColor: "#000000",
	appleWebApp: {
		capable: true,
		title: "Your App",
		statusBarStyle: "black-translucent",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
			</head>
			<body>{children}</body>
		</html>
	);
}
