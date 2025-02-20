/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";


export default function PWAInstallButton() {
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [isInstalled, setIsInstalled] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e);
		};

		const handleAppInstalled = () => {
			setIsInstalled(true);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		window.addEventListener("appinstalled", handleAppInstalled);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt,
			);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, []);

	const handleInstallClick = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
				if (choiceResult.outcome === "accepted") {
					console.log("User accepted install");
				}
				setDeferredPrompt(null);
			});
		}
	};

	if (isInstalled || !deferredPrompt) return null;

	return (
		<button
			onClick={handleInstallClick}
			style={{ color: "black" }}
			className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300"
		>
			Install App
		</button>
	);
}
