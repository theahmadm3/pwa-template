"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./auth/login/page"), { ssr: false });

export default function LandingPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	const handleClick = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setShowLogin(true);
		}, 5000); // Simulate loading time
	};

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			{!showLogin ? (
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: isLoading ? 0 : 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col items-center"
				>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={handleClick}
						className="px-6 py-3 bg-black text-white rounded-xl"
					>
						Start the app
					</motion.button>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="w-full h-full flex items-center justify-center"
				>
					<LoginForm />
				</motion.div>
			)}

			{isLoading && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0 }}
					transition={{ duration: 2 }}
					className="absolute flex flex-col gap-y-4 items-center justify-center h-screen w-screen bg-white"
				>
					<div className="w-10 h-10 border-4 border-gray-400 border-t-black rounded-full animate-spin"></div>
					<p>Real landing page is coming soon...</p>
				</motion.div>
			)}
		</div>
	);
}
