"use client";
import * as React from "react";
import { SwapHoriz } from "@mui/icons-material";
import Image from "next/image";
import bgImage from "/public/assets/images/auth-background.png";
import googleLogo from "/public/assets/icons/google-logo.svg";

export default function LoginForm() {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const manualSectionRef = React.useRef<HTMLDivElement>(null);
	const [isTouchDevice, setIsTouchDevice] = React.useState(false);

	const scrollToManual = () => {
		manualSectionRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	const scrollToGoogle = () => {
		containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
	};

	React.useEffect(() => {
		const container = containerRef.current;
		if (container) {
			const preventScroll = (e: Event) => {
				e.preventDefault();
				e.stopPropagation();
			};
			container.addEventListener("wheel", preventScroll, { passive: false });
			container.addEventListener("touchmove", preventScroll, {
				passive: false,
			});

			return () => {
				container.removeEventListener("wheel", preventScroll);
				container.removeEventListener("touchmove", preventScroll);
			};
		}
	}, []);
	React.useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.style.scrollbarWidth = "none"; // For Firefox
		}
	}, []);
	React.useEffect(() => {
		const checkTouchSupport = () => {
			setIsTouchDevice(
				"ontouchstart" in window ||
					navigator.maxTouchPoints > 0 ||
					window.matchMedia("(pointer: coarse)").matches,
			);
		};

		checkTouchSupport();
	}, []);

	return (
		<div
			className={`md:absolute md:z-40 md:px-8 md:bottom-[-10rem] md:left-16 mobile:relative h-[400px] max-h-[70vh]
                overflow-y-auto md:bg-white md:shadow rounded-3xl mobile:w-full min-w-fit md:w-377px
                `}
			ref={containerRef}
		>
			{/* Google Login Section */}
			<div className="flex flex-col justify-center gap-y-3 h-full">
				<Image
					src={bgImage}
					alt="background"
					className="md:hidden w-full aspect-[1.85/1] mb-5 mx-auto"
				/>
				<div className="mobile:hidden mb-8">
					<h1 className="text-2xl font-bold w-full">Welcome back!</h1>
					<p className="w-full text-gray-600">Login using:</p>
				</div>
				<button className="font-bold text-gray-600 inline-flex self-center justify-center items-center gap-x-3 mobile:w-full w-[325px] py-3 my-1 bg-transparent border border-gray-600 rounded-full">
					<Image src={googleLogo} alt="google" className="h-6 w-6" />
					<span>Login with Google</span>
				</button>
				<button
					onClick={scrollToManual}
					className="inline-flex self-center gap-x-3 text-gray-600 mobile:w-full w-[325px] py-3 my-1 hover:text-black"
				>
					<SwapHoriz />
					<span>{isTouchDevice ? "Tap" : "Click"} to switch to manual</span>
				</button>
			</div>

			{/* Manual Login Section */}
			<div
				ref={manualSectionRef}
				className="flex flex-col justify-center items-center gap-y-3 h-full"
			>
				<form className="flex flex-col gap-y-3">
					<h1 className="mobile:hidden font-bold text-2xl">Log in</h1>
					<input
						type="email"
						placeholder="name@email.com"
						className="w-[325px] py-3 px-3 bg-white outline-none border-[0.75px] border-black rounded-md"
					/>
					<input
						type="password"
						placeholder="please enter a password"
						className="w-[325px] py-3 px-3 bg-white outline-none border-[0.75px] border-black rounded-md"
					/>
					<span className="text-gray-400 text-sm hover:text-black cursor-pointer">
						Forgot password?
					</span>
					<button className="w-fit px-8 py-3 bg-black text-white hover:bg-gray-200 hover:text-black rounded-full">
						Proceed
					</button>
				</form>
				<button
					onClick={scrollToGoogle}
					className="inline-flex gap-x-3 w-[325px] text-gray-600 py-3 my-3 hover:text-black"
				>
					<SwapHoriz />

					<span>{isTouchDevice ? "Tap" : "Click"} to login with Google</span>
				</button>
			</div>
		</div>
	);
}
