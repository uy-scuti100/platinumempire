"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartComponent } from "./cart";
import Menu from "./menu";

import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchIcon from "./search-icon";

export default function Navbar() {
	const [isAboveLimit, setIsAboveLimit] = useState(false);
	const pathname = usePathname();
	const [logoColor, setLogoColor] = useState(100);
	const halfPage = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
	const isHome = pathname === "/";

	const slideVariants = {
		initial: { opacity: 0, scale: 1.1 },
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.7,
				ease: "easeInOut",
			},
		},
		exit: {
			opacity: 0,
			scale: 0.9,
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
	};
	const textVariants = {
		initial: { y: -50, opacity: 0 },
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition =
				typeof window !== "undefined"
					? window.scrollY || document.documentElement.scrollTop
					: 0;

			if (scrollPosition > halfPage && isHome) {
				setIsAboveLimit(true);
				setLogoColor(0);
			} else {
				setIsAboveLimit(false);
				setLogoColor(100);
			}
		};
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, [halfPage, isHome]);

	const NONESHOWINGPAGES = ["/thank-you", "/checkout"];
	if (NONESHOWINGPAGES.includes(pathname)) {
		return null;
	}
	return (
		<nav className="fixed md:pb-6 w-full top-0 z-50">
			<motion.div
				initial="initial"
				animate="animate"
				variants={textVariants}
				transition={{ duration: 0.8, ease: "easeInOut" }}
				className="bg-gradient-to-r from-red-500 to-yellow-500 w-full text-center text-white py-2 text-xs"
			>
				<p>
					FREE DELIVERY AVAILABLE ON ORDERS above{" "}
					<span className="font-black"> #100,000</span>
				</p>
			</motion.div>
			<div
				className={`mx-auto pt-5 px-5 xl:pt-10 xl:pb-5 xl:border-b pb-2 ${
					isAboveLimit && pathname === "/"
						? "bg-white duration-700 transition-colors shadow ease-in-out border border-b"
						: pathname !== "/"
							? "bg-white duration-700 transition-colors ease-in-out"
							: "bg-none duration-700 transition-colors ease-in-out"
				}`}
			>
				<motion.div
					variants={slideVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="flex flex-row gap-4 items-center justify-between mb-4 xl:mb-0 relative "
				>
					{/* menu */}
					<div className="text-3xl cursor-pointer">
						<Menu isAboveLimit={isAboveLimit} pathname={pathname} />
					</div>

					<Link
						href={"/"}
						className={`absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${!isAboveLimit && isHome ? "backdrop-blur-sm px-4 py-2 bg-black/10 rounded-md" : ""} `}
					>
						<Image
							src="/logo.svg"
							alt="platinum  Fashion hub"
							sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1060px) 75vw, 60vw"
							loading="lazy"
							width={150}
							height={150}
							className="w-[150px] xl:h-[150px] xl:w-[200px] z-[70] "
							style={
								isHome
									? { filter: `brightness(${logoColor}%)` }
									: { filter: "brightness(0%)" }
							}
						/>
					</Link>

					<div className="flex items-center gap-4">
						{/* cart icon */}
						<div>
							<SearchIcon isAboveLimit={isAboveLimit} pathname={pathname} />
						</div>
						<div>
							<CartComponent isAboveLimit={isAboveLimit} pathname={pathname} />
						</div>
					</div>
				</motion.div>
			</div>
		</nav>
	);
}
