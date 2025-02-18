"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import { LocationOn } from "@mui/icons-material";

import Image from "next/image";
import profileIcon from "/public/assets/icons/profile-icon.svg";
import bgImage from "/public/assets/images/auth-background.png";
import LoginForm from "@/components/ui/login";

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Store", "login"];

export default function Login(props: Props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			{/* <Typography variant="h6" sx={{ my: 2 }}>
				MUI
			</Typography> */}
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<button
							className={`py-1 w-fit mx-auto my-2 hover:opacity-70 ${
								item === "login"
									? "text-[#B63B56] border-b border-b-[#B63B56]"
									: "text-black"
							}`}
							style={{ textAlign: "center" }}
						>
							<ListItemText primary={item} />
						</button>
					</ListItem>
				))}
				<ListItem disablePadding>
					<button className="bg-[#B63B56] hover:opacity-70 border-none text-white rounded-xl w-fit px-4 py-3 mx-auto my-3">
						Become a Shopper
					</button>
				</ListItem>
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			{/* <CssBaseline /> */}
			<AppBar component="nav" sx={{ boxShadow: "none", border: "none" }}>
				<Toolbar className="justify-end gap-x-4 bg-white">
					{/* <Box className="mobile:hidden md:hidden lg:block"></Box> */}
					<Box
						className="text-black md:w-1/2 flex-row gap-x-2 justify-center md:justify-end text-lg font-bold pt-3"
						sx={{ display: { xs: "none", sm: "flex" } }}
					>
						<LocationOn />
						<span>Abuja</span>
					</Box>
					<Box
						className="md:w-1/2 justify-end flex-row pt-3"
						sx={{ display: { xs: "none", sm: "flex" } }}
					>
						{navItems.map((item) => (
							<button
								key={item}
								className={`py-3 w-fit mx-4 hover:opacity-70  
									${
										item === "login"
											? "text-[#B63B56] border-b border-b-[#B63B56]"
											: "text-black"
									}`}
							>
								{item}
							</button>
						))}
						<button className="bg-[#B63B56] hover:opacity-70 border-none text-white rounded-xl mx-4 px-4 py-3">
							Become a Shopper
						</button>
					</Box>
					<Box sx={{ display: { sm: "none" } }}>
						<IconButton aria-label="open profile" edge="start" className="mx-2">
							<Image
								className="w-12 h-12"
								alt="profile icon"
								src={profileIcon}
							/>
						</IconButton>
						<IconButton
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
						>
							<MenuIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					anchor="right"
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</nav>
			<main className="bg-[#f5f5f5] w-full h-[70vh] px-4 md:relative">
				<div className="w-full h-fit mobile:hidden">
					<Toolbar />
				</div>
				<div className="w-full h-[25px] mobile:hidden"></div>
				<p className="md:hidden my-8 sticky top-0 left-0 z-10 font-bold">
					Welcome back
				</p>
				<Image
					src={bgImage}
					alt="shoppergetit background"
					className="w-full h-full mobile:hidden"
				/>

				<LoginForm />
			</main>
		</Box>
	);
}
