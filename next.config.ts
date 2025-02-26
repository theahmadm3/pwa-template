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
