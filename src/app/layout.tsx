/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import "../styles/globals.css";

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
	const [isAppInstalled, setAppInstalled] = useState(false);
	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
			e.preventDefault();
			setDeferredPrompt(e);
		};

		const handleAppInstalled = () => {
			setAppInstalled(true);
		};

		const checkStandalone = () => {
			if (
				window.matchMedia &&
				window.matchMedia("(display-mode: standalone)").matches
			) {
				setAppInstalled(true);
			}
		};

		const checkMobile = () => {
			setMobile(window.matchMedia("(max-width: 768px)").matches);
		};

		window.addEventListener(
			"beforeinstallprompt",
			handleBeforeInstallPrompt as any,
		);
		window.addEventListener("appinstalled", handleAppInstalled);
		window.addEventListener("DOMContentLoaded", checkStandalone);
		window.addEventListener("load", checkStandalone);
		window.addEventListener("pageshow", checkStandalone);
		window.addEventListener("resize", checkMobile);
		checkMobile();

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt as any,
			);
			window.removeEventListener("appinstalled", handleAppInstalled);
			window.removeEventListener("DOMContentLoaded", checkStandalone);
			window.removeEventListener("load", checkStandalone);
			window.removeEventListener("pageshow", checkStandalone);
			window.removeEventListener("resize", checkMobile);
		};
	}, [deferredPrompt]);

	const installPWA = () => {
		if (!deferredPrompt) {
			console.log("Installation prompt not available");
			alert("Installation prompt not available");
			return;
		}
		(deferredPrompt as BeforeInstallPromptEvent).prompt();
		(deferredPrompt as BeforeInstallPromptEvent).userChoice.then(
			(choiceResult) => {
				if (choiceResult.outcome === "accepted") {
					console.log("User accepted the install prompt");
					setAppInstalled(true);
				} else {
					console.log("User dismissed the install prompt");
				}
				setDeferredPrompt(null);
			},
		);
	};

	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
				<meta name="theme-color" content="#3c7fec" />
			</head>
			<body>
				{children}
				{isMobile && deferredPrompt && !isAppInstalled && (
					<button onClick={installPWA}>Install App</button>
				)}
			</body>
		</html>
	);
}
