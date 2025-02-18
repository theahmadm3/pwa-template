import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Google, SwapHoriz } from "@mui/icons-material";
import Image from "next/image";
import bgImage from "/public/assets/images/auth-background.png";

export default function LoginnForm() {
	const [isManualLogin, setIsManualLogin] = useState(false);
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		const checkTouchSupport = () => {
			setIsTouchDevice(
				"ontouchstart" in window ||
					navigator.maxTouchPoints > 0 ||
					window.matchMedia("(pointer: coarse)").matches,
			);
		};

		checkTouchSupport();
	}, []);

	useEffect(() => {
		const container = document.getElementById("containerRef");
		if (container !== null) {
			container.style.overflow = "hidden";
			return () => {
				if (container !== null) {
					container.style.overflow = "auto";
				}
			};
		}
	}, []);

	return (
		<div
			id="containerRef"
			className="flex flex-col items-center justify-center overflow-hidden relative h-[400px] w-[350px]"
		>
			<motion.div
				initial={{ y: 0, opacity: 1 }}
				animate={{
					y: isManualLogin ? -100 : 0,
					opacity: isManualLogin ? 0 : 1,
				}}
				exit={{ y: -100, opacity: 0 }}
				transition={{ duration: 1 }}
				className={`absolute flex flex-col justify-center gap-y-3 w-full ${
					isManualLogin ? "hidden" : ""
				}`}
			>
				<Image
					src={bgImage}
					alt="background"
					className="md:hidden w-full aspect-[1.85/1] mb-5 mx-auto"
				/>
				<h1 className="text-3xl font-bold mobile:hidden">Welcome back!</h1>
				<p className="text-sm mobile:hidden">Login using:</p>
				<button className="inline-flex justify-center self-center gap-x-3 w-[325px] py-3 bg-transparent border border-black rounded-2xl">
					<Google />
					<span>Login with Google</span>
				</button>
				<button
					onClick={() => setIsManualLogin(true)}
					className="inline-flex gap-x-3 self-center w-[325px] py-3"
				>
					<SwapHoriz />
					<span>{isTouchDevice ? "Tap" : "Click"} to switch to manual</span>
				</button>
			</motion.div>

			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: isManualLogin ? 0 : 100, opacity: isManualLogin ? 1 : 0 }}
				exit={{ y: 100, opacity: 0 }}
				transition={{ duration: 1 }}
				className={`absolute flex flex-col justify-center items-center gap-y-3 w-full ${
					!isManualLogin ? "hidden" : ""
				}`}
			>
				<form className="flex flex-col gap-y-3">
					<input
						type="email"
						placeholder="name@email.com"
						className="w-[325px] py-3 px-3 border border-black rounded-2xl"
					/>
					<input
						type="password"
						placeholder="please enter password"
						className="w-[325px] py-3 px-3 border border-black rounded-2xl"
					/>
					<span className="text-gray-400 text-sm hover:opacity-50 cursor-pointer">
						Forgot password?
					</span>
					<button className="w-[325px] py-3 bg-black text-white rounded-2xl">
						Proceed
					</button>
				</form>
				<button
					onClick={() => setIsManualLogin(false)}
					className="inline-flex gap-x-3 w-[325px] py-3"
				>
					<SwapHoriz />
					<span>{isTouchDevice ? "Tap" : "Click"} to login with Google</span>
				</button>
			</motion.div>
		</div>
	);
}
