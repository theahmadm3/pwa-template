This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Steps to make your Next App a PWA

## Step 1

Add the next-pwa package by `npm i next-pwa`
If you're using typescript, make sure to add the types by `npm i -D @types/next-pwa`
Then create a `types` directory (folder) and inside create the types file (`next-pwa.d.ts`) and add the content below:
```
declare module "next-pwa" {
	import { NextConfig } from "next";
	function withPWA(config: NextConfig): (nextConfig: NextConfig) => NextConfig;
	export default withPWA;
}
```

## Step 2

Create a `manifest.json` file at your `public` directory (folder).
Make sure you have your app logo in that same folder.

## Step 3

Your `next.config.js` or `.ts` should look like this:
```
import nextPWA from "next-pwa";

const withPWA = nextPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
});

const nextConfig = {
	// Your existing Next.js configuration here, if any
};

export default withPWA(nextConfig);
```
# Step 4

Add `manifest.json` and other configs to the `head` tag in the `src/app/layout.tsx` file
Mine is like this:
```
<head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
  <meta name="theme-color" content="#3c7fec" />
</head>
```

# Step 5

Your pwa is now setup, run `npm run build` to build your next app, this will create service worker files and register them.
When the build is done test if it works, sometimes it takes a while before it does and it usually does not work on `dev mode`,
so to test on production mode locally, build it (`npm run build `) and then `npm run start` instead of `dev`.

# Step 6 (Bonus)

You can add prompt to users to let them know your website is a pwa. You can do all this from the `src/app/layout.tsx` file.
This is how I did mine:
```
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
```
Hope this has been clear and simple to setup. You can check the repo for more information, thank you for reading!
