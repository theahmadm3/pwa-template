// app/components/navBar.tsx
"use client";

import { useEffect, useRef } from "react";

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const NavBar = () => {
	const installButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		// Register Service Worker
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker
					.register("/sw.js")
					.then((registration) => {
						console.log("Service Worker registered:", registration);
					})
					.catch((error) => {
						console.error("Service Worker registration failed:", error);
					});
			});
		}

		// Handle Install Prompt
		let deferredPrompt: BeforeInstallPromptEvent | null = null;

		window.addEventListener("beforeinstallprompt", (event: Event) => {
			event.preventDefault();
			deferredPrompt = event as BeforeInstallPromptEvent;
			if (installButtonRef.current) {
				installButtonRef.current.removeAttribute("hidden");
			}
		});

		const installButton = installButtonRef.current;
		if (installButton) {
			installButton.addEventListener("click", () => {
				if (deferredPrompt) {
					deferredPrompt.prompt();
					deferredPrompt.userChoice.then((choiceResult) => {
						if (choiceResult.outcome === "accepted") {
							console.log("App installed");
						} else {
							console.log("App installation declined");
						}
						deferredPrompt = null;
						if (installButton) {
							installButton.setAttribute("hidden", "");
						}
					});
				}
			});
		}

		// Optional: Log when app is installed
		window.addEventListener("appinstalled", () => {
			console.log("PWA was installed");
		});

		// Cleanup event listeners (optional, for completeness)
		return () => {
			if (installButton) {
				installButton.removeEventListener("click", () => {});
			}
		};
	}, []);

	return (
		<nav>
			{/* Other nav content */}
			<button
				className="text-black bg-white p-2 rounded-md shadow"
				id="install-button"
				ref={installButtonRef}
				hidden
			>
				Install App
			</button>
		</nav>
	);
};

export default NavBar;
