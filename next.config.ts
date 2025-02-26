import nextPWA from "next-pwa";

const withPWA = nextPWA({
	dest: "public", // Output directory for service worker files
	register: true, // Automatically register the service worker
	skipWaiting: true, // Activate the service worker immediately
});

const nextConfig = {
	// Your existing Next.js configuration here, if any
};

export default withPWA(nextConfig);
