import withPWA from "@ducanh2912/next-pwa";

const withPWAConfig = withPWA({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
	// Your existing Next.js config
};

export default withPWAConfig(nextConfig);
